# 🚀 Hướng Dẫn Thêm Assets Khác

Bạn vừa thêm ETH thành công! Hành quy trình này hoàn toàn có thể lặp lại để thêm bất kỳ asset nào khác.

---

## 📋 Danh Sách Symbols Yahoo Finance

### Cryptocurrency (Hữu ích)
```
Bitcoin:    BTC-USD
Ethereum:   ETH-USD ✅ (Đã thêm)
Ripple:     XRP-USD
Cardano:    ADA-USD
Solana:     SOL-USD
Polkadot:   DOT-USD
Dogecoin:   DOGE-USD
Litecoin:   LTC-USD
```

### Indexes
```
S&P 500:    ^GSPC ✅
Dow Jones:  ^DJI ✅
Nasdaq:     ^IXIC ✅
Russell 2000: ^RUT
```

### Commodities
```
Gold:       GC=F ✅
Silver:     SI=F
Brent Oil:  BZ=F ✅
WTI Oil:    CL=F ✅
Natural Gas: NG=F
Copper:     HG=F
```

### Currencies
```
USD/EUR:    EURUSD=X
USD/GBP:    GBPUSD=X
USD/JPY:    JPYUSD=X
```

---

## 🔧 4 Bước Thêm Asset Mới

### Ví Dụ: Thêm Solana (SOL)

#### **Bước 1: Cập Nhật `src/services/marketData.ts`**

```typescript
// File: src/services/marketData.ts

// Trong interface MarketData, thêm:
export interface MarketData {
  SPX: PriceData;
  DJI: PriceData;
  IXIC: PriceData;
  BRENT: PriceData;
  WTI: PriceData;
  GOLD: PriceData;
  BTC: PriceData;
  ETH: PriceData;
  SOL: PriceData;  // ← THÊM DÒNG NÀY
}

// Trong hàm getMarketData(), thêm vào symbols:
const symbols = {
  SPX: "^GSPC",
  DJI: "^DJI",
  IXIC: "^IXIC",
  BRENT: "BZ=F",
  WTI: "CL=F",
  GOLD: "GC=F",
  BTC: "BTC-USD",
  ETH: "ETH-USD",
  SOL: "SOL-USD",  // ← THÊM DÒNG NÀY
};
```

#### **Bước 2: Cập Nhật `src/formatters/telegram.ts`**

```typescript
// File: src/formatters/telegram.ts

export function formatTelegramMessage(data: MarketData): string {
  const today = new Date().toLocaleDateString("vi-VN");

  return `*CẬP NHẬT THỊ TRƯỜNG THẾ GIỚI - ${today}*

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
Ethereum: ${formatPrice(data.ETH)}
Solana: ${formatPrice(data.SOL)}`;  // ← THÊM DÒNG NÀY
}
```

#### **Bước 3: Cập Nhật `src/formatters/email.ts`**

```typescript
// File: src/formatters/email.ts

export function formatEmailMessage(data: MarketData): string {
  return `
    <!DOCTYPE html>
    <html lang="vi">
    ...
    <h3>₿ Cryptocurrency</h3>
    <p>
      Bitcoin: ${formatPrice(data.BTC)}<br>
      Ethereum: ${formatPrice(data.ETH)}<br>
      Solana: ${formatPrice(data.SOL)}<br>  <!-- THÊM DÒNG NÀY -->
    </p>
    ...
  `;
}
```

#### **Bước 4: Cập Nhật `tests/formatters.test.ts`**

```typescript
// File: tests/formatters.test.ts

const mockMarketData: MarketData = {
  // ... các assets khác ...
  ETH: {
    close: 2500.0,
    previousClose: 2450.0,
    percent_change: "+2.04%",
  },
  SOL: {  // ← THÊM BLOCK NÀY
    close: 200.0,
    previousClose: 190.0,
    percent_change: "+5.26%",
  },
};

// Thêm assertions:
it("should include all market assets", () => {
  const message = formatEmailMessage(mockMarketData);
  
  // ... existing expects ...
  expect(message).toContain("Solana");  // ← THÊM DÒNG NÀY
});
```

---

## 🎯 Checklist Thêm Asset

- [ ] Tìm symbol Yahoo Finance
- [ ] Cập nhật MarketData interface (thêm type)
- [ ] Cập nhật symbols object
- [ ] Cập nhật Telegram formatter
- [ ] Cập nhật Email formatter  
- [ ] Cập nhật mock data trong tests
- [ ] Thêm expect() assertions
- [ ] Run: `npm run build`
- [ ] Run: `npm run test:run`
- [ ] Commit & Push

---

## 🔍 Kiểm Tra Syntax

Sau khi thêm, chạy lệnh:

```bash
# Build TypeScript
npm run build

# Run tests
npm run test:run

# Nếu lỗi → Xem error message
# Thường là:
# - Quên khai báo trong interface
# - Quên format price()
# - Typo trong tên variable
```

---

## 💡 Mẹo

### 1. Test Symbol Trước
Nếu không chắc symbol đúng, test trước bằng cách:
```bash
# Tạo file test-symbol.ts tạm thời
# Hoặc fetch trực tiếp bằng curl
curl "https://query1.finance.yahoo.com/v8/finance/chart/SOL-USD"
```

### 2. Thêm Nhiều Cùng Lúc
Thay vì thêm từng cái một, bạn có thể thêm 5 assets cùng lúc rồi test chung.

### 3. Group Theo Kategori
Organize formatters theo kategori (Stocks, Commodities, Crypto) để dễ quản lý.

### 4. Config File (Future)
Nếu thêm nhiều, có thể tạo config file để:
```typescript
const MARKET_SYMBOLS = {
  stocks: { SPX: "^GSPC", ... },
  commodities: { GOLD: "GC=F", ... },
  crypto: { BTC: "BTC-USD", ETH: "ETH-USD", SOL: "SOL-USD", ... }
};
```

---

## 📊 Ví Dụ: Thêm 3 Altcoins

Nếu muốn thêm XRP, ADA, DOT cùng lúc:

**Thêm vào marketData.ts:**
```typescript
export interface MarketData {
  // ... existing ...
  BTC: PriceData;
  ETH: PriceData;
  XRP: PriceData;  // ← Mới
  ADA: PriceData;  // ← Mới
  DOT: PriceData;  // ← Mới
}

const symbols = {
  // ... existing ...
  XRP: "XRP-USD",
  ADA: "ADA-USD",
  DOT: "DOT-USD",
};
```

**Thêm vào telegram formatter:**
```typescript
*Cryptocurrency:*
Bitcoin: ${formatPrice(data.BTC)}
Ethereum: ${formatPrice(data.ETH)}
Ripple: ${formatPrice(data.XRP)}
Cardano: ${formatPrice(data.ADA)}
Polkadot: ${formatPrice(data.DOT)}
```

**Giống hệt cho email formatter**

**Cập nhật tests với mock data:**
```typescript
XRP: { close: 2.50, previousClose: 2.40, percent_change: "+4.17%" },
ADA: { close: 0.95, previousClose: 0.93, percent_change: "+2.15%" },
DOT: { close: 35.00, previousClose: 34.00, percent_change: "+2.94%" },
```

---

## 🚀 Automated Steps

```bash
# 1. Thêm symbol vào marketData.ts
# 2. Build để kiểm tra syntax
npm run build

# 3. Chỉnh sửa formatters
# 4. Build lại
npm run build

# 5. Thêm mock data & tests
# 6. Run tests
npm run test:run

# 7. Nếu test pass, commit
git add .
git commit -m "feat: Add XRP, ADA, DOT to market tracking"
git push origin main
```

---

## ❓ FAQ

**Q: Làm sao biết symbol chính xác?**
A: Vào Yahoo Finance, tìm asset, lấy ticker từ URL

**Q: Có giới hạn số lượng asset?**
A: Không! Thêm bao nhiêu cũng được. Chỉ là chạy nhanh hơn/chậm hơn tùy số lượng

**Q: Có ảnh hưởng chi phí không?**
A: Không! Public repo = unlimited, vẫn miễn phí

**Q: Làm sao nếu API trả về null?**
A: Yahoo Finance bị downtime. Code đã xử lý error, sẽ thấy "Không lấy được dữ liệu"

---

**Chúc bạn thêm assets thành công! 🚀**
