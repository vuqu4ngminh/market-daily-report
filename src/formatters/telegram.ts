import { MarketData, PriceData } from "../services/marketData.js";

function formatPrice(item: PriceData | undefined): string {
  if (!item || !item.close) {
    return "Không lấy được dữ liệu";
  }
  return `${item.close.toFixed(2)} (${item.percent_change})`;
}

function sectionTitle(title: string, items: Array<PriceData | undefined>): string {
  const knownStatuses = items
    .map((item) => item?.isMarketOpen)
    .filter((status): status is boolean => typeof status === "boolean");
  const isClosed = knownStatuses.length > 0 && knownStatuses.every((status) => !status);
  return `${title}${isClosed ? " (đóng cửa)" : ""}`;
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

  return `*CẬP NHẬT THỊ TRƯỜNG THẾ GIỚI - ${vietnamDate}*

*${sectionTitle("Chứng khoán Mỹ", [data.SPX, data.DJI, data.IXIC])}:*
S&P 500: ${formatPrice(data.SPX)}
Dow Jones: ${formatPrice(data.DJI)}
Nasdaq: ${formatPrice(data.IXIC)}

*${sectionTitle("Vàng & Dầu", [data.GOLD, data.BRENT, data.WTI])}:*
Vàng: ${formatPrice(data.GOLD)}
Dầu Brent: ${formatPrice(data.BRENT)}
Dầu WTI: ${formatPrice(data.WTI)}

*Cryptocurrency:*
Bitcoin: ${formatPrice(data.BTC)}
Ethereum: ${formatPrice(data.ETH)}`;
}
