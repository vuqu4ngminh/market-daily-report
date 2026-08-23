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
}

interface YahooChartResponse {
  chart: {
    result: Array<{
      meta: {
        regularMarketPrice: number;
        previousClose: number;
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

    const percentChange =
      ((meta.regularMarketPrice - meta.previousClose) / meta.previousClose) * 100;

    return {
      close: meta.regularMarketPrice,
      previousClose: meta.previousClose,
      percent_change: `${percentChange >= 0 ? "+" : ""}${percentChange.toFixed(2)}%`,
    };
  } catch (error) {
    console.error(`Error fetching data for ${symbol}:`, error);
    throw error;
  }
}

export async function getMarketData(): Promise<MarketData> {
  const symbols = {
    SPX: "^GSPC",
    DJI: "^DJI",
    IXIC: "^IXIC",
    BRENT: "BZ=F",
    WTI: "CL=F",
    GOLD: "GC=F",
    BTC: "BTC-USD",
    ETH: "ETH-USD",
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

  return results as MarketData;
}
