import { MarketData, PriceData } from "../services/marketData.js";

function formatPrice(item: PriceData | undefined): string {
  if (!item || !item.close) {
    return "Không lấy được dữ liệu";
  }
  return `${item.close.toFixed(2)} (${item.percent_change})`;
}

export function formatTelegramMessage(data: MarketData): string {
  // Format date in Vietnam timezone (GMT+7)
  const vietnamDate = new Date(new Date().getTime() + 7 * 60 * 60 * 1000)
    .toLocaleDateString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" });

  return `*CẬP NHẬT THỊ TRƯỜNG THẾ GIỚI - ${vietnamDate}*

*Chứng khoán Mỹ:*
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
