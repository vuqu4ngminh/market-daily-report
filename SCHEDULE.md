# ⏰ Lịch Chạy Báo Cáo Thị Trường

## 📅 Lịch Trình Hiện Tại

Báo cáo chạy **12 lần/ngày** - **Mỗi 2 giờ** bắt đầu từ **7 AM GMT+7**

```
GMT+7 (Giờ Việt Nam)  |  UTC (Server Time)  |  Mô Tả
─────────────────────────────────────────────────────
7:00 AM (Sáng)       |  00:00 (Nửa đêm)   |  ✅ Đầu tiên
9:00 AM              |  02:00              |  ✅
11:00 AM (Trưa)      |  04:00              |  ✅
1:00 PM (Chiều)      |  06:00              |  ✅
3:00 PM              |  08:00              |  ✅
5:00 PM              |  10:00              |  ✅
7:00 PM (Tối)        |  12:00 (Trưa UTC)  |  ✅
9:00 PM              |  14:00              |  ✅
11:00 PM (Đêm)       |  16:00              |  ✅
1:00 AM (Sáng Hôm Sau)|  18:00              |  ✅
3:00 AM              |  20:00              |  ✅
5:00 AM              |  22:00              |  ✅
```

## 🔧 Cron Expression

```
0 0,2,4,6,8,10,12,14,16,18,20,22 * * *
│ └─ Giờ chạy (UTC): 0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22
└─ Phút: 0 (chạy lúc :00)
```

**Tính năng:**
- ✅ Chạy tất cả các ngày trong tuần
- ✅ Chạy tất cả các tháng
- ✅ Không có ngày riêng biệt (hàng ngày)

---

## 📊 Thống Kê

| Chỉ Số | Giá Trị |
|--------|--------|
| **Lần/Ngày** | 12 lần |
| **Giờ Đầu** | 7:00 AM GMT+7 |
| **Giờ Cuối** | 5:00 AM GMT+7 (ngày hôm sau) |
| **Khoảng Cách** | 2 giờ |
| **Minutes/Tháng** | ~360 phút (12 lần × 2 phút × 30 ngày) |
| **Chi Phí** | 💰 FREE (Public Repo) |

---

## 🚀 Chạy Manual

Bạn có thể chạy báo cáo bất kỳ lúc nào:

1. Truy cập: **GitHub** → **Actions**
2. Click: **Market Daily Report**
3. Click: **Run workflow** → **Run workflow**
4. Chờ ~2 phút để hoàn thành

---

## ✏️ Tùy Chỉnh Lịch

Để thay đổi lịch chạy, sửa `.github/workflows/market-report.yml`:

### Ví Dụ 1: Chạy 4 Lần/Ngày (6 Giờ/Lần)
```yaml
schedule:
  - cron: "0 0,6,12,18 * * *"
```
**Kết quả:** 6 AM, 12 PM, 6 PM, 12 AM (GMT+7)

### Ví Dụ 2: Chạy Hàng Giờ (24 Lần/Ngày)
```yaml
schedule:
  - cron: "0 * * * *"
```
**Kết quả:** Mỗi giờ, ngay lúc :00

### Ví Dụ 3: Chạy Buổi Sáng + Buổi Chiều
```yaml
schedule:
  - cron: "0 0,8 * * *"
```
**Kết quả:** 7 AM + 3 PM GMT+7

### Ví Dụ 4: Chỉ Weekdays (Thứ 2 - Thứ 6)
```yaml
schedule:
  - cron: "0 0,2,4,6,8,10,12,14,16,18,20,22 * * 1-5"
```
**Kết quả:** 12 lần/ngày nhưng chỉ Thứ 2-6

---

## 🧮 Công Thức Tính Cron

**Format:** `minute hour day month day-of-week`

```
Cron Field Guide:
┌─────────────── phút (0-59)
│ ┌───────────── giờ (0-23, UTC)
│ │ ┌─────────── ngày tháng (1-31)
│ │ │ ┌───────── tháng (1-12)
│ │ │ │ ┌─────── ngày tuần (0-6, 0=Chủ Nhật)
│ │ │ │ │
* * * * *
│
└─ `0` = chạy lúc :00
  `*/2` = mỗi 2 đơn vị
  `0,2,4` = lúc 0, 2, 4
```

---

## 📝 Cheat Sheet

| Yêu Cầu | Cron Expression |
|--------|----------------|
| Hàng giờ | `0 * * * *` |
| Mỗi 2h | `0 */2 * * *` |
| Mỗi 3h | `0 */3 * * *` |
| Mỗi 30 phút | `*/30 * * * *` |
| 7 AM GMT+7 mỗi ngày | `0 0 * * *` |
| 12 PM + 6 PM GMT+7 | `0 5,11 * * *` |
| Thứ 2-5 lúc 9 AM UTC | `0 9 * * 1-4` |
| Hằng ngày (không chủ nhật) | `0 * * * 1-6` |

---

## 💡 Optimizing Your Schedule

### Nếu Chỉ Cần Theo Dõi Giờ Hành Chính

```yaml
schedule:
  - cron: "0 0,2,4,6,8,10 * * *"  # 7 AM - 5 PM GMT+7
```
**6 lần/ngày, không chiều tối/đêm**

### Nếu Muốn Mọi Giờ

```yaml
schedule:
  - cron: "0 * * * *"  # Mỗi giờ
```
**24 lần/ngày (vẫn FREE với public repo)**

### Nếu Muốn Cân Bằng

```yaml
schedule:
  - cron: "0 0,4,8,12,16,20 * * *"  # Mỗi 4 giờ
```
**6 lần/ngày, đều đặn**

---

## 🔔 Notifications

Mỗi lần chạy sẽ:
- 📲 Gửi tin nhắn Telegram
- 📧 Gửi email báo cáo
- 📊 Lấy dữ liệu thị trường mới nhất

---

## ❓ FAQ

**Q: Sao chạy từ 0 AM UTC = 7 AM GMT+7?**
```
UTC+7 (Việt Nam) = UTC + 7 giờ
0 AM UTC = 0 + 7 = 7 AM GMT+7 ✅
```

**Q: Có tính phí không nếu public repo?**
```
KHÔNG! Public repo = Unlimited minutes, miễn phí! 💰
```

**Q: Liệu có chậm không?**
```
Không, GitHub Actions rất nhanh:
- Checkout: 30 seconds
- Install: 15 seconds (cached)
- Build: 5 seconds
- Fetch data: 5 seconds
- Send: 5 seconds
─────────────
Total: ~60 seconds
```

**Q: Có thể thay đổi bất kỳ lúc nào không?**
```
CÓ! Chỉ cần edit .github/workflows/market-report.yml
Commit & push, GitHub sẽ tự update.
```

---

## 🎯 Hành Động Tiếp Theo

1. Commit thay đổi:
   ```bash
   git add .
   git commit -m "feat: Change schedule to every 2 hours"
   git push origin main
   ```

2. GitHub sẽ tự áp dụng lịch mới

3. Workflow sẽ chạy theo lịch mới vào lần tiếp theo

---

## 📞 Support

Để điều chỉnh lịch theo nhu cầu của bạn, sử dụng công cụ này:
**[Crontab Guru](https://crontab.guru/)** - Giải thích cron expression

Ví dụ: Dán `0 0,2,4,6,8,10,12,14,16,18,20,22 * * *` vào sẽ thấy giải thích chi tiết.
