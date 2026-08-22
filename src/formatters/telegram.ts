import { MarketData, PriceData } from "../services/marketData.js";

function formatPrice(item: PriceData | undefined): string {
  if (!item || !item.close) {
    return "Không lấy được dữ liệu";
  }
  return `${item.close.toFixed(2)} (${item.percent_change})`;
}

function formatVietnamStockPrice(item: PriceData | undefined): string {
  if (!item || !item.close) {
    return "Không lấy được dữ liệu";
  }

  const priceInVnd = item.close * 1_000;
  const formattedPrice = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(priceInVnd);

  return `${formattedPrice} (${item.percent_change})`;
}

function formatVietnamIndex(item: PriceData | undefined): string {
  if (!item || !item.close) {
    return "Không lấy được dữ liệu";
  }

  return `${new Intl.NumberFormat("vi-VN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(item.close)} điểm (${item.percent_change})`;
}

export function formatTelegramMessage(data: MarketData): string {
  const vietnamDate = new Intl.DateTimeFormat("vi-VN", {
    timeZone: "Asia/Ho_Chi_Minh",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  })
    .format(new Date())
    .replace(/\//g, "-");

  return `*CẬP NHẬT THỊ TRƯỜNG - ${vietnamDate}*

*Chỉ số chứng khoán:*
VN-Index: ${formatVietnamIndex(data.vietnam?.VNINDEX)}
VN30: ${formatVietnamIndex(data.vietnam?.VN30)}
S&P 500: ${formatPrice(data.SPX)}
Dow Jones: ${formatPrice(data.DJI)}
Nasdaq: ${formatPrice(data.IXIC)}

*Vàng & Dầu:*
Vàng: ${formatPrice(data.GOLD)}
Dầu Brent: ${formatPrice(data.BRENT)}
Dầu WTI: ${formatPrice(data.WTI)}

*Cryptocurrency:*
Bitcoin: ${formatPrice(data.BTC)}
Ethereum: ${formatPrice(data.ETH)}`;
}

export function formatVn100TelegramMessage(data: Record<string, PriceData>): string {
  const rows = Object.entries(data)
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([symbol, price]) => `${symbol}: ${formatVietnamStockPrice(price)}`);

  return `*CẬP NHẬT THỊ TRƯỜNG - NHÓM CỔ PHIẾU VN100*\n\n${
    rows.length > 0 ? rows.join("\n") : "Không lấy được dữ liệu VN100"
  }`;
}
