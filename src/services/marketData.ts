export interface MarketData {
  SPX: PriceData;
  DJI: PriceData;
  IXIC: PriceData;
  BRENT: PriceData;
  WTI: PriceData;
  GOLD: PriceData;
  BTC: PriceData;
  ETH: PriceData;
}

export interface PriceData {
  close: number;
  previousClose: number;
  percent_change: string;
  isMarketOpen?: boolean;
}

interface CoinMarketCapQuoteResponse {
  data: Record<
    "BTC" | "ETH",
    Array<{
      quote: {
        USD: {
          price: number;
          percent_change_24h: number;
        };
      };
    }>
  >;
  status: {
    error_code: number;
    error_message: string | null;
  };
}

interface YahooChartResponse {
  chart: {
    result: Array<{
      meta: {
        regularMarketPrice: number;
        previousClose: number;
        currentTradingPeriod?: {
          regular?: {
            start: number;
            end: number;
          };
        };
      };
    }>;
  };
}

async function fetchYahooData(symbol: string): Promise<PriceData> {
  try {
    const url = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(symbol)}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Yahoo Finance API error: ${response.statusText}`);
    }

    const json = (await response.json()) as YahooChartResponse;
    const meta = json.chart.result[0].meta;
    const regularSession = meta.currentTradingPeriod?.regular;
    const now = Date.now() / 1000;

    const percentChange =
      ((meta.regularMarketPrice - meta.previousClose) / meta.previousClose) * 100;

    return {
      close: meta.regularMarketPrice,
      previousClose: meta.previousClose,
      percent_change: `${percentChange >= 0 ? "+" : ""}${percentChange.toFixed(2)}%`,
      isMarketOpen: regularSession
        ? now >= regularSession.start && now < regularSession.end
        : undefined,
    };
  } catch (error) {
    console.error(`Error fetching data for ${symbol}:`, error);
    throw error;
  }
}

async function fetchCoinMarketCapData(
  apiKey: string
): Promise<Pick<MarketData, "BTC" | "ETH">> {
  const url = new URL(
    "https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest"
  );
  url.searchParams.set("symbol", "BTC,ETH");
  url.searchParams.set("convert", "USD");

  const response = await fetch(url, {
    headers: {
      "X-CMC_PRO_API_KEY": apiKey,
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(
      `CoinMarketCap API error: ${response.status} ${response.statusText}`
    );
  }

  const json = (await response.json()) as CoinMarketCapQuoteResponse;

  if (json.status.error_code !== 0) {
    throw new Error(
      `CoinMarketCap API error ${json.status.error_code}: ${json.status.error_message ?? "Unknown error"}`
    );
  }

  const toPriceData = (symbol: "BTC" | "ETH"): PriceData => {
    const asset = json.data[symbol]?.[0];
    const quote = asset?.quote.USD;

    if (!quote || !Number.isFinite(quote.price)) {
      throw new Error(`CoinMarketCap response is missing ${symbol}/USD quote`);
    }

    const percentChange = quote.percent_change_24h;
    const previousClose = Number.isFinite(percentChange)
      ? quote.price / (1 + percentChange / 100)
      : quote.price;

    return {
      close: quote.price,
      previousClose,
      percent_change: Number.isFinite(percentChange)
        ? `${percentChange >= 0 ? "+" : ""}${percentChange.toFixed(2)}%`
        : "N/A",
      isMarketOpen: true,
    };
  };

  return {
    BTC: toPriceData("BTC"),
    ETH: toPriceData("ETH"),
  };
}

export async function getMarketData(
  coinMarketCapApiKey: string
): Promise<MarketData> {
  const symbols = {
    SPX: "^GSPC",
    DJI: "^DJI",
    IXIC: "^IXIC",
    BRENT: "BZ=F",
    WTI: "CL=F",
    GOLD: "GC=F",
  };

  const results: Partial<MarketData> = {};

  // Fetch all data in parallel
  const promises = Object.entries(symbols).map(async ([key, symbol]) => {
    try {
      results[key as keyof MarketData] = await fetchYahooData(symbol);
    } catch (error) {
      console.error(`Failed to fetch ${key}:`, error);
      throw error;
    }
  });

  await Promise.all(promises);

  const cryptoData = await fetchCoinMarketCapData(coinMarketCapApiKey);
  results.BTC = cryptoData.BTC;
  results.ETH = cryptoData.ETH;

  return results as MarketData;
}
