# 📊 BIỂU ĐỒ LỊCH CHẠY

## Lịch Chạy Hàng Ngày (GMT+7)

```
┌─────────────────────────────────────────────────────┐
│  LỊCH CẬP NHẬT BÁO CÁO THỊ TRƯỜNG - 12 LẦN/NGÀY    │
└─────────────────────────────────────────────────────┘

SÁNG (Morning)
┌──────────┐
│ 7 AM ✅  │  Cập nhật đầu tiên
└──────────┘
    ↓ 2h
┌──────────┐
│ 9 AM ✅  │  Cập nhật thứ 2
└──────────┘
    ↓ 2h
┌──────────┐
│ 11 AM ✅ │  Cập nhật thứ 3
└──────────┘

TRƯA (Midday)
    ↓ 2h
┌──────────┐
│ 1 PM ✅  │  Cập nhật thứ 4
└──────────┘
    ↓ 2h
┌──────────┐
│ 3 PM ✅  │  Cập nhật thứ 5
└──────────┘

CHIỀU (Afternoon)
    ↓ 2h
┌──────────┐
│ 5 PM ✅  │  Cập nhật thứ 6
└──────────┘

TỐI (Evening)
    ↓ 2h
┌──────────┐
│ 7 PM ✅  │  Cập nhật thứ 7
└──────────┘
    ↓ 2h
┌──────────┐
│ 9 PM ✅  │  Cập nhật thứ 8
└──────────┘
    ↓ 2h
┌──────────┐
│ 11 PM ✅ │  Cập nhật thứ 9
└──────────┘

ĐÊM (Night)
    ↓ 2h
┌──────────┐
│ 1 AM ✅  │  Cập nhật thứ 10 (rạng sáng)
└──────────┘
    ↓ 2h
┌──────────┐
│ 3 AM ✅  │  Cập nhật thứ 11
└──────────┘
    ↓ 2h
┌──────────┐
│ 5 AM ✅  │  Cập nhật thứ 12
└──────────┘
    ↓ 2h
↻ Quay lại 7 AM (ngày tiếp theo)
```

---

## 📱 Thông Báo Nhận Được

Mỗi giờ chạy, bạn nhận được:

```
┌─────────────────────────────────────┐
│  📲 TELEGRAM NOTIFICATION           │
├─────────────────────────────────────┤
│  CẬP NHẬT THỊ TRƯỜNG THẾ GIỚI       │
│  22/07/2026                         │
│                                     │
│  Chứng khoán Mỹ:                    │
│  S&P 500: 4500.25 (+0.45%)          │
│  Dow Jones: 35000.00 (+0.29%)       │
│  Nasdaq: 14200.50 (+0.71%)          │
│                                     │
│  Vàng & Dầu:                        │
│  Vàng: 1950.50 (+0.54%)             │
│  Dầu Brent: 82.50 (+3.13%)          │
│  Dầu WTI: 78.25 (+2.96%)            │
│                                     │
│  Bitcoin:                           │
│  BTC: 45000.00 (+2.27%)             │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│  📧 EMAIL NOTIFICATION              │
├─────────────────────────────────────┤
│  Tiêu đề: CẬP NHẬT THỊ TRƯỜNG       │
│           THẾ GIỚI 22/07/2026       │
│                                     │
│  📊 HTML Email với:                 │
│     ✅ Bảng biểu đẹp                │
│     ✅ Màu sắc (xanh/đỏ)            │
│     ✅ Định dạng chuyên nghiệp      │
│     ✅ Tất cả dữ liệu thị trường   │
└─────────────────────────────────────┘
```

---

## 📈 Cron Expression Breakdown

```
0 0,2,4,6,8,10,12,14,16,18,20,22 * * *
│ │                                │ │ │
│ │                                │ │ └─ Day of week (0-6): * = mỗi ngày
│ │                                │ └─── Month (1-12): * = mỗi tháng
│ │                                └───── Day of month (1-31): * = mỗi ngày
│ └─────────────────────────────────────── Hour (0-23 UTC):
│                                         0, 2, 4, 6, 8, 10, 12,
│                                         14, 16, 18, 20, 22
│                                         (= 7AM, 9AM, 11AM, ...)
└───────────────────────────────────────── Minute (0-59): 0 = :00
```

---

## 💾 Dữ Liệu Chuyển Đổi

```
UTC Giờ Chạy    →    GMT+7 Giờ Chạy (Việt Nam)
────────────────────────────────────────────────
UTC 0           →    GMT+7 7:00 AM  ✅
UTC 2           →    GMT+7 9:00 AM  ✅
UTC 4           →    GMT+7 11:00 AM ✅
UTC 6           →    GMT+7 1:00 PM  ✅
UTC 8           →    GMT+7 3:00 PM  ✅
UTC 10          →    GMT+7 5:00 PM  ✅
UTC 12          →    GMT+7 7:00 PM  ✅
UTC 14          →    GMT+7 9:00 PM  ✅
UTC 16          →    GMT+7 11:00 PM ✅
UTC 18          →    GMT+7 1:00 AM  ✅
UTC 20          →    GMT+7 3:00 AM  ✅
UTC 22          →    GMT+7 5:00 AM  ✅
```

---

## 📊 Thống Kê Hàng Tháng

```
┌──────────────────────────┐
│  THỐNG KÊ HÀNG THÁNG     │
├──────────────────────────┤
│ Lần chạy/Ngày:    12     │
│ Lần chạy/Tháng:   360    │
│ Telegram msgs:    360    │
│ Emails gửi:       360    │
│ Thời gian/lần:    ~2 min │
│ Total time/tháng: ~12 hrs│
│ Chi phí:          FREE ✅│
└──────────────────────────┘
```

---

## 🔄 Workflow Execution Timeline

```
Mỗi 2 giờ:

START
  ↓
[1] Checkout Code (30s)
  ↓
[2] Setup Node.js (15s) [cached]
  ↓
[3] Install Dependencies (10s) [cached]
  ↓
[4] Build TypeScript (5s)
  ↓
[5] Fetch Market Data (5s) ← Parallel requests
  ↓
[6] Format Messages (1s)
  ↓
[7] Send Telegram (2s)
  ↓
[8] Send Email (3s)
  ↓
COMPLETE (~60-90 seconds)
  ↓
Repeat in 2 hours
```

---

## 🎯 Quá Trình Triển Khai

```
┌─────────────────────────────────┐
│ 1. COMMIT & PUSH               │
├─────────────────────────────────┤
│ $ git add .                     │
│ $ git commit -m "Update ..."    │
│ $ git push origin main          │
└─────────────────────────────────┘
         ↓
┌─────────────────────────────────┐
│ 2. GitHub Nhận & Lưu Workflow   │
├─────────────────────────────────┤
│ .github/workflows/              │
│ market-report.yml (cập nhật)    │
└─────────────────────────────────┘
         ↓
┌─────────────────────────────────┐
│ 3. Workflow Sẵn Sàng           │
├─────────────────────────────────┤
│ Mỗi 2 giờ → Tự chạy tự động    │
│ Bất kỳ lúc → Manual trigger     │
└─────────────────────────────────┘
         ↓
┌─────────────────────────────────┐
│ 4. Nhận Thông Báo              │
├─────────────────────────────────┤
│ 📱 Telegram: Ngay lập tức       │
│ 📧 Email: Trong 1 phút          │
└─────────────────────────────────┘
```

---

## 🎉 Kết Quả

```
TRƯỚC:  1 lần/ngày
        ↓
NƯỚC:   12 lần/ngày ✅
        
CHI PHÍ: $0 (Public repo) 💰
ĐỘ TIN: 99.9% (GitHub SLA)
```

---

## 📞 Chỉnh Sửa Lịch

Để thay đổi lịch:

1. Edit `.github/workflows/market-report.yml`
2. Sửa dòng: `- cron: "0 0,2,4,6,8,10,12,14,16,18,20,22 * * *"`
3. Commit & Push
4. GitHub tự áp dụng

**Ví dụ**: Chạy mỗi giờ:
```yaml
- cron: "0 * * * *"
```

---

**Lịch chạy của bạn hiện đã được cập nhật thành công! 🚀**
