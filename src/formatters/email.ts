import { MarketData, PriceData } from "../services/marketData.js";

function formatPrice(item: PriceData | undefined): string {
  if (!item || !item.close) {
    return "N/A";
  }

  const change = parseFloat(item.percent_change);
  const color = change >= 0 ? "green" : "red";

  return `${item.close.toFixed(2)} <span style="color:${color}">(${item.percent_change})</span>`;
}

function changeColor(item: PriceData): string {
  return parseFloat(item.percent_change) >= 0 ? "green" : "red";
}

function formatVietnamIndex(item: PriceData | undefined): string {
  if (!item || !item.close) {
    return "N/A";
  }

  const formattedValue = new Intl.NumberFormat("vi-VN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(item.close);

  return `${formattedValue} điểm <span style="color:${changeColor(item)}">(${item.percent_change})</span>`;
}

export function formatEmailMessage(data: MarketData): string {
  return `
    <!DOCTYPE html>
    <html lang="vi">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
        }
        h2 {
          color: #2c3e50;
          border-bottom: 2px solid #3498db;
          padding-bottom: 10px;
        }
        h3 {
          color: #34495e;
          margin-top: 20px;
        }
        p {
          margin: 10px 0;
          font-size: 16px;
        }
        span {
          font-weight: bold;
        }
      </style>
    </head>
    <body>
      <h2>CẬP NHẬT THỊ TRƯỜNG</h2>

      <h3>📈 Chỉ số chứng khoán</h3>
      <p>
        VN-Index: ${formatVietnamIndex(data.vietnam?.VNINDEX)}<br>
        VN30: ${formatVietnamIndex(data.vietnam?.VN30)}<br>
        S&P 500: ${formatPrice(data.SPX)}<br>
        Dow Jones: ${formatPrice(data.DJI)}<br>
        Nasdaq: ${formatPrice(data.IXIC)}
      </p>
      
      <h3>💰 Vàng & Dầu</h3>
      <p>
        Vàng: ${formatPrice(data.GOLD)}<br>
        Dầu Brent: ${formatPrice(data.BRENT)}<br>
        Dầu WTI: ${formatPrice(data.WTI)}
      </p>
      
      <h3>₿ Cryptocurrency</h3>
      <p>
        Bitcoin: ${formatPrice(data.BTC)}<br>
        Ethereum: ${formatPrice(data.ETH)}<br>
      </p>
      
      <hr style="margin-top: 30px; border: none; border-top: 1px solid #ddd;">
      <p style="font-size: 12px; color: #7f8c8d; margin-top: 20px;">
        Cập nhật: ${new Intl.DateTimeFormat("vi-VN", {
          timeZone: "Asia/Ho_Chi_Minh",
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })
          .format(new Date())
          .replace(",", "")
          .replace(/\//g, "-")}
      </p>
    </body>
    </html>
  `;
}
