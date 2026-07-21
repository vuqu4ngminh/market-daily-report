# Quick Start Guide

## 🎯 What You Have Now

Your Google Apps Script has been transformed into a professional, production-ready Node.js/TypeScript project that can:
- ✅ Fetch market data from Yahoo Finance API
- ✅ Send formatted messages to Telegram
- ✅ Send HTML emails with market reports
- ✅ Run automatically on GitHub Actions
- ✅ Test locally before deploying
- ✅ Has unit tests for reliability
- ✅ Follows TypeScript best practices

## 📋 Next Steps

### 1️⃣ Test Locally (5 minutes)

```bash
# Copy environment template
cp .env.example .env

# Edit .env with your credentials
# - TELEGRAM_TOKEN: Get from BotFather on Telegram
# - TELEGRAM_CHAT_ID: Your Telegram user ID
# - EMAIL_USER: Your Gmail address
# - EMAIL_PASSWORD: Gmail app password (NOT your regular password!)
# - EMAIL_RECIPIENT: Where to send reports

# Install dependencies (already done)
npm install

# Build TypeScript
npm run build

# Run the report
npm start
```

**Expected output:**
- ✅ Telegram message appears in your Telegram chat
- ✅ Email appears in your inbox
- ✅ Console shows success messages

### 2️⃣ Deploy to GitHub Actions (10 minutes)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "chore: Convert GAS to Node.js TypeScript project"
   git push origin main
   ```

2. **Add GitHub Secrets**
   - Go to: Settings > Secrets and Variables > Actions
   - Add these 5 secrets:
     - `TELEGRAM_TOKEN`
     - `TELEGRAM_CHAT_ID`
     - `EMAIL_USER`
     - `EMAIL_PASSWORD`
     - `EMAIL_RECIPIENT`

3. **Verify Workflow**
   - Go to Actions tab
   - Click "Market Daily Report"
   - Click "Run workflow"
   - Wait ~2 minutes
   - Check logs and verify messages were sent

### 3️⃣ Customize (Optional)

**Change schedule:**
Edit `.github/workflows/market-report.yml`:
- Line 7: `cron: "0 1 * * *"` (1 AM UTC = 8 AM GMT+7)
- Use [crontab.guru](https://crontab.guru) to adjust

**Add more assets:**
Edit `src/services/marketData.ts` and update formatters

**Add more channels:**
Create new service files in `src/services/` and add to `src/index.ts`

## 📚 Documentation

- **README.md** - Project overview
- **DEPLOYMENT.md** - Detailed deployment guide with troubleshooting
- **CONTRIBUTING.md** - Development guidelines
- **.env.example** - Environment variables template

## 🧪 Testing

```bash
# Run unit tests
npm run test:run

# Run tests in watch mode
npm run test

# Lint code
npm run lint

# Format code
npm run format
```

## 🔍 Gmail App Password

GitHub Actions requires Gmail app password (not your regular password):
1. Go to [myaccount.google.com/security](https://myaccount.google.com/security)
2. Enable 2-Step Verification if not already enabled
3. Search for "App passwords"
4. Select "Mail" and "Windows Computer"
5. Google will generate a 16-character password
6. Use this as `EMAIL_PASSWORD` in GitHub secrets

## ⚙️ Architecture

```
src/
├── config/        - Environment & credentials management
├── services/      - External API integrations
│   ├── marketData.ts    - Yahoo Finance
│   ├── telegram.ts      - Telegram Bot API
│   └── email.ts         - Gmail SMTP
├── formatters/    - Message formatting for each channel
│   ├── telegram.ts      - Markdown format
│   └── email.ts         - HTML format
└── utils/         - Helper functions (logging, etc)
```

## 🚀 Automation Schedule

**Default:** Every day at 8 AM GMT+7 (1 AM UTC)

The workflow:
1. Fetches latest market data (~5 seconds)
2. Formats messages (~1 second)
3. Sends to Telegram (~2 seconds)
4. Sends email (~2 seconds)
5. Total time: ~60-120 seconds

## 📊 What's Tracked

- S&P 500 (^GSPC)
- Dow Jones (^DJI)
- Nasdaq (^IXIC)
- Gold (GC=F)
- Brent Oil (BZ=F)
- WTI Oil (CL=F)
- Bitcoin (BTC-USD)

## 🎯 File Structure Overview

```
Market Daily Report/
├── .github/
│   └── workflows/market-report.yml     ← GitHub Actions automation
├── src/
│   ├── config/config.ts                ← Configuration
│   ├── services/                       ← API integrations
│   ├── formatters/                     ← Message formatting
│   ├── utils/logger.ts                 ← Logging
│   └── index.ts                        ← Main entry point
├── tests/
│   └── formatters.test.ts              ← Unit tests
├── package.json                        ← Dependencies
├── tsconfig.json                       ← TypeScript config
├── .env.example                        ← Template for secrets
├── README.md                           ← Project overview
├── DEPLOYMENT.md                       ← Deployment guide
└── CONTRIBUTING.md                     ← Development guide
```

## ✅ Verification Checklist

- [ ] Ran `npm run build` successfully
- [ ] Ran `npm run test:run` - all tests pass
- [ ] Tested locally with `npm start`
- [ ] Received Telegram message
- [ ] Received email
- [ ] Pushed to GitHub
- [ ] Added GitHub secrets
- [ ] Manually triggered workflow from Actions tab
- [ ] Workflow completed successfully
- [ ] Received messages from workflow run

## 💡 Pro Tips

1. **Test mode:** `TEST_MODE=true npm start` - prepares messages without sending
2. **Debug mode:** `LOG_LEVEL=debug npm start` - see detailed logs
3. **Manual trigger:** Go to Actions > Run workflow > Run workflow
4. **Check logs:** Actions > Workflow run > send-report job
5. **Save costs:** Current schedule uses ~48 minutes/month (under free tier)

## 🆘 Need Help?

Check these files for detailed information:
- Build errors? → Check tsconfig.json and package.json
- Deployment issues? → See DEPLOYMENT.md
- Development? → See CONTRIBUTING.md
- Feature requests? → Consider extending src/services/ and src/formatters/

## 🎉 You're All Set!

Your market report automation is ready to run 24/7 on GitHub Actions!

Questions? Check the documentation files or the inline code comments.
