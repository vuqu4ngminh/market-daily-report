# Deployment Guide

## Local Testing

Before deploying to GitHub Actions, test locally with your credentials:

### 1. Setup Environment Variables

```bash
cp .env.example .env
```

Edit `.env` and fill in:
- `TELEGRAM_TOKEN` - Your bot token
- `TELEGRAM_CHAT_ID` - Your chat ID
- `EMAIL_USER` - Your Gmail address
- `EMAIL_PASSWORD` - Gmail app password
- `EMAIL_RECIPIENT` - Where to send reports

### 2. Install and Build

```bash
npm install
npm run build
```

### 3. Test Run

```bash
npm start
```

Check that:
- ✅ Telegram message received in your chat
- ✅ Email received in your inbox
- ✅ No errors in console output

## GitHub Actions Setup

### 1. Add Repository Secrets

On GitHub, go to:
**Settings > Secrets and Variables > Actions > New repository secret**

Add these secrets:
- `TELEGRAM_TOKEN` - Your bot token
- `TELEGRAM_CHAT_ID` - Your chat ID  
- `EMAIL_USER` - Your Gmail address
- `EMAIL_PASSWORD` - Your app password (not regular password)
- `EMAIL_RECIPIENT` - Your email address

### 2. Enable GitHub Actions

Make sure Actions are enabled in your repository settings.

### 3. Configure Workflow Schedule

The workflow runs daily at 8 AM GMT+7 (1 AM UTC).

To change the schedule, edit `.github/workflows/market-report.yml`:

```yaml
schedule:
  - cron: "0 1 * * *"  # Change these numbers
```

Cron format: `minute hour day month day-of-week`

Common examples:
- `0 8 * * *` - 8 AM UTC daily
- `0 0 * * *` - 12 AM (midnight) UTC daily
- `0 9 * * MON` - Every Monday at 9 AM UTC
- `0 */2 * * *` - Every 2 hours

[Cron expression reference](https://crontab.guru/)

### 4. Manual Trigger

You can manually trigger the workflow anytime:
1. Go to **Actions** in your GitHub repository
2. Click **Market Daily Report** workflow
3. Click **Run workflow > Run workflow**

## Monitoring Workflow Runs

### View Logs

1. Go to **Actions** tab in your repository
2. Click the workflow run
3. Click **send-report** job
4. View the logs

### Troubleshooting Failed Runs

If a run fails:
1. Check the workflow logs for error messages
2. Verify secrets are set correctly (don't copy/paste - retype)
3. Test locally: `npm start`
4. Check credential expiration (app passwords)

Common errors:
- **"Unauthorized"** - Invalid credentials or secrets
- **"Failed to fetch data"** - Yahoo Finance API timeout
- **"ECONNREFUSED"** - Network connectivity issue
- **"ENOTFOUND"** - DNS resolution issue

## Performance

Each workflow run takes approximately:
- 30-60 seconds to checkout and setup
- 20-30 seconds to install dependencies (cached on subsequent runs)
- 5-10 seconds to fetch market data
- 2-5 seconds to send messages
- **Total: 60-120 seconds**

## Cost Considerations

GitHub Actions includes free minutes:
- 2,000 minutes per month for private repos (paid accounts)
- Unlimited for public repos

This workflow:
- Runs 24 times per day (daily schedule)
- Uses ~2 minutes per run
- Total: ~48 minutes per month

Well within free tier limits.

## Security Best Practices

1. **Never commit `.env` file** - Already in `.gitignore`
2. **Use app passwords for Gmail** - Don't use your regular password
3. **Rotate secrets regularly** - Especially if compromised
4. **Restrict secret access** - Only add trusted contributors
5. **Monitor workflow runs** - Check for suspicious activity

## Backup & Recovery

If something goes wrong:

### Disable the workflow temporarily
Comment out the `on:` section in `.github/workflows/market-report.yml`:
```yaml
# on:
#   schedule:
#     - cron: "0 1 * * *"
#   workflow_dispatch:
```

### Rollback to previous version
1. Git revert to previous commit
2. Push to main branch
3. Workflow will use new code on next run

## Updating Credentials

To update Telegram or Email credentials:

1. Go to **Settings > Secrets and Variables > Actions**
2. Click on the secret to update
3. Click **Update secret**
4. Paste new value
5. Save

Changes take effect on next workflow run.

## Decommissioning

To permanently disable the workflow:

1. Delete `.github/workflows/market-report.yml`
2. Push changes to main branch
3. Or go to **Actions** and disable the workflow

## Integration with Other Services

Future integrations (Slack, Discord, etc.):
1. Add new service file in `src/services/`
2. Add formatter in `src/formatters/`
3. Add service in main `src/index.ts`
4. Add secrets to GitHub
5. Test locally before deploying
