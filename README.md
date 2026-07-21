# Market Daily Report

Automatic market daily report sender via Telegram and Email using GitHub Actions.

## Features

- 📊 Fetch real-time market data from Yahoo Finance API
- 💬 Send formatted messages to Telegram
- 📧 Send HTML formatted emails
- 🤖 Automated scheduling via GitHub Actions
- 🔐 Secure credential management with environment variables
- 📝 TypeScript for type safety
- ✅ Unit tests included

## Project Structure

```
.
├── src/
│   ├── index.ts              # Main entry point
│   ├── config/
│   │   └── config.ts         # Configuration management
│   ├── services/
│   │   ├── marketData.ts     # Yahoo Finance API integration
│   │   ├── telegram.ts       # Telegram sender
│   │   └── email.ts          # Email sender
│   ├── formatters/
│   │   ├── telegram.ts       # Telegram message formatter
│   │   └── email.ts          # Email HTML formatter
│   └── utils/
│       └── logger.ts         # Logging utility
├── tests/
│   └── *.test.ts            # Unit tests
├── .github/workflows/
│   └── market-report.yml    # GitHub Actions workflow
├── .env.example             # Environment variables template
├── package.json
├── tsconfig.json
└── README.md
```

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env` file based on `.env.example`:

```bash
cp .env.example .env
```

Fill in your credentials:
- `TELEGRAM_TOKEN`: Your Telegram bot token
- `TELEGRAM_CHAT_ID`: Your Telegram chat ID
- `EMAIL_USER`: Email account for sending (Gmail recommended)
- `EMAIL_PASSWORD`: Email account password or app password
- `EMAIL_RECIPIENT`: Email address to send reports to

### 3. Build

```bash
npm run build
```

### 4. Run Locally

```bash
npm start
```

Or with TypeScript directly (requires ts-node):

```bash
npm run dev
```

## GitHub Actions Setup

1. Add secrets to your GitHub repository:
   - `TELEGRAM_TOKEN`
   - `TELEGRAM_CHAT_ID`
   - `EMAIL_USER`
   - `EMAIL_PASSWORD`
   - `EMAIL_RECIPIENT`

2. The workflow will automatically run every 2 hours starting from 7 AM GMT+7:
   - **Schedule:** 7 AM → 9 AM → 11 AM → 1 PM → 3 PM → 5 PM → 7 PM → 9 PM → 11 PM → 1 AM → 3 AM → 5 AM (GMT+7)
   - **Total:** 12 times per day
   - **Cost:** Unlimited (FREE for public repos)

## Development

### Run Tests

```bash
npm run test
```

### Lint Code

```bash
npm run lint
```

### Format Code

```bash
npm run format
```

## Features Details

### Market Data
- S&P 500 (^GSPC)
- Dow Jones (^DJI)
- Nasdaq (^IXIC)
- Gold (GC=F)
- Brent Oil (BZ=F)
- WTI Oil (CL=F)
- Bitcoin (BTC-USD)

### Message Format

#### Telegram
- Markdown formatting with bold headers
- Price and percentage change for each asset
- Grouped by category (Stocks, Commodities, Crypto)

#### Email
- HTML formatted with colors (green for gains, red for losses)
- Professional styling
- Same data grouping as Telegram

## Contributing

Feel free to submit issues and enhancement requests!

## License

MIT
