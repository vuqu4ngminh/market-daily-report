import { createHmac, randomUUID } from "node:crypto";
import { PriceData, VietnamSymbol } from "./marketData.js";

export interface DnseConfig {
  apiKey: string;
  apiSecret: string;
  baseUrl: string;
  apiVersion: string;
}

const SYMBOLS: VietnamSymbol[] = ["VNINDEX", "VN30"];
const VN100_FETCH_CONCURRENCY = 5;

interface DnseOhlcResponse {
  t?: number[];
  c?: number[];
  data?: Array<{ time?: number; close?: number }>;
}

interface DnseInstrument {
  symbol?: string;
}

interface DnseInstrumentsResponse {
  data?: DnseInstrument[];
  instruments?: DnseInstrument[];
}

function formatDateHeader(date: Date): string {
  return date.toUTCString().replace("GMT", "+0000");
}

function signatureHeaders(
  config: DnseConfig,
  method: string,
  path: string
): Record<string, string> {
  const date = formatDateHeader(new Date());
  const nonce = randomUUID().replace(/-/g, "");
  const signingText = `(request-target): ${method.toLowerCase()} ${path}\ndate: ${date}\nnonce: ${nonce}`;
  const signature = encodeURIComponent(
    createHmac("sha256", Buffer.from(config.apiSecret, "utf8"))
      .update(signingText, "utf8")
      .digest("base64")
  );

  return {
    Date: date,
    "X-Signature": `Signature keyId="${config.apiKey}",algorithm="hmac-sha256",headers="(request-target) date",signature="${signature}",nonce="${nonce}"`,
    "x-api-key": config.apiKey,
    version: config.apiVersion,
  };
}

function extractCloses(payload: DnseOhlcResponse): number[] {
  if (Array.isArray(payload.c)) {
    return payload.c.filter(Number.isFinite);
  }

  if (Array.isArray(payload.data)) {
    return payload.data
      .map((bar) => bar.close)
      .filter((close): close is number => typeof close === "number" && Number.isFinite(close));
  }

  return [];
}

async function fetchDnseSymbol(
  symbol: string,
  config: DnseConfig,
  type: "INDEX" | "STOCK"
): Promise<PriceData> {
  const path = "/price/ohlc";
  const now = Math.floor(Date.now() / 1000);
  const from = now - 14 * 24 * 60 * 60;
  const url = new URL(path, `${config.baseUrl.replace(/\/$/, "")}/`);

  url.searchParams.set("type", type);
  url.searchParams.set("symbol", symbol);
  url.searchParams.set("resolution", "1D");
  url.searchParams.set("from", String(from));
  url.searchParams.set("to", String(now));

  const response = await fetch(url, {
    headers: signatureHeaders(config, "GET", path),
  });

  if (!response.ok) {
    const detail = (await response.text()).slice(0, 300);
    throw new Error(`DNSE ${symbol}: HTTP ${response.status} ${detail}`);
  }

  const closes = extractCloses((await response.json()) as DnseOhlcResponse);
  if (closes.length < 2) {
    throw new Error(`DNSE ${symbol}: không đủ 2 nến ngày để tính biến động`);
  }

  const close = closes.at(-1)!;
  const previousClose = closes.at(-2)!;
  const percentChange = ((close - previousClose) / previousClose) * 100;

  return {
    close,
    previousClose,
    percent_change: `${percentChange >= 0 ? "+" : ""}${percentChange.toFixed(2)}%`,
  };
}

export async function getDnseMarketData(
  config: DnseConfig
): Promise<Partial<Record<VietnamSymbol, PriceData>>> {
  const entries = await Promise.all(
    SYMBOLS.map(async (symbol) => {
      try {
        return [symbol, await fetchDnseSymbol(symbol, config, "INDEX")] as const;
      } catch (error) {
        console.error(`Không lấy được dữ liệu DNSE cho ${symbol}:`, error);
        return [symbol, undefined] as const;
      }
    })
  );

  return Object.fromEntries(entries.filter((entry) => entry[1] !== undefined));
}

export async function getVn100Symbols(config: DnseConfig): Promise<string[]> {
  const path = "/instruments";
  const url = new URL(path, `${config.baseUrl.replace(/\/$/, "")}/`);
  url.searchParams.set("indexName", "VN100");
  url.searchParams.set("limit", "100");
  url.searchParams.set("page", "1");

  const response = await fetch(url, {
    headers: signatureHeaders(config, "GET", path),
  });

  if (!response.ok) {
    const detail = (await response.text()).slice(0, 300);
    throw new Error(`DNSE VN100 instruments: HTTP ${response.status} ${detail}`);
  }

  const payload = (await response.json()) as DnseInstrumentsResponse | DnseInstrument[];
  const instruments = Array.isArray(payload)
    ? payload
    : payload.data ?? payload.instruments ?? [];
  const symbols = instruments
    .map((instrument) => instrument.symbol?.toUpperCase())
    .filter((symbol): symbol is string => Boolean(symbol));

  if (symbols.length === 0) {
    throw new Error("DNSE không trả về thành phần của VN100");
  }

  return [...new Set(symbols)].sort();
}

export async function getVn100MarketData(
  config: DnseConfig
): Promise<Record<string, PriceData>> {
  const symbols = await getVn100Symbols(config);
  const results: Record<string, PriceData> = {};

  for (let index = 0; index < symbols.length; index += VN100_FETCH_CONCURRENCY) {
    const batch = symbols.slice(index, index + VN100_FETCH_CONCURRENCY);
    const entries = await Promise.all(
      batch.map(async (symbol) => {
        try {
          return [symbol, await fetchDnseSymbol(symbol, config, "STOCK")] as const;
        } catch (error) {
          console.error(`Không lấy được dữ liệu DNSE cho ${symbol}:`, error);
          return [symbol, undefined] as const;
        }
      })
    );

    for (const [symbol, price] of entries) {
      if (price) {
        results[symbol] = price;
      }
    }
  }

  return results;
}
