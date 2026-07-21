# Contributing to Market Daily Report

## Development Setup

1. Clone the repository
2. Copy `.env.example` to `.env` and fill in your test credentials
3. Install dependencies: `npm install`
4. Build: `npm run build`

## Development Workflow

### Running Locally

```bash
# With compiled JavaScript
npm start

# With TypeScript (requires ts-node)
npm run dev

# Test mode (won't send actual messages)
TEST_MODE=true npm start
```

### Testing

```bash
# Run tests once
npm run test:run

# Run tests in watch mode
npm run test
```

### Linting & Formatting

```bash
# Check code quality
npm run lint

# Auto-format code
npm run format
```

## Project Structure

- `src/config/` - Configuration management and environment variables
- `src/services/` - Integration with external APIs (Yahoo Finance, Telegram, Email)
- `src/formatters/` - Message formatting for different channels
- `src/utils/` - Utility functions (logging, etc.)
- `tests/` - Unit tests
- `.github/workflows/` - GitHub Actions automation

## Adding New Market Indicators

To add a new asset to track:

1. Update the symbols object in `src/services/marketData.ts`
2. Update the formatter functions in `src/formatters/telegram.ts` and `src/formatters/email.ts`
3. Add tests in `tests/formatters.test.ts`
4. Run tests: `npm run test:run`

Example:
```typescript
// In marketData.ts
const symbols = {
  // ... existing
  SP500: "^GSPC",  // Add new symbol
};
```

## Testing Before Deploying

1. Fill in `.env` with your test credentials
2. Run: `npm start`
3. Check that Telegram and Email were received correctly
4. For GitHub Actions testing, use `workflow_dispatch` to manually trigger the workflow

## Code Standards

- Use TypeScript for all code
- Keep functions small and focused
- Add meaningful comments for complex logic
- Write tests for new features
- Format with `npm run format`
- Pass linting with `npm run lint`

## Debugging

Enable debug logging:
```bash
LOG_LEVEL=debug npm start
```

Test mode (prepares messages but doesn't send):
```bash
TEST_MODE=true npm start
```

## GitHub Actions Secrets

The workflow requires these secrets to be set:
- `TELEGRAM_TOKEN` - Bot token from BotFather
- `TELEGRAM_CHAT_ID` - Your chat ID
- `EMAIL_USER` - Gmail address
- `EMAIL_PASSWORD` - Gmail app password (not regular password)
- `EMAIL_RECIPIENT` - Recipient email address

## Common Issues

### Gmail authentication fails
- Use an app password, not your regular password
- [Create an app password](https://support.google.com/accounts/answer/185833)

### Telegram message not sending
- Verify the token is correct (starts with bot token)
- Check the chat ID is correct (should be a number)
- Ensure bot is added to the chat

### Tests fail after adding new data
- Update the mock data in `tests/formatters.test.ts`
- Ensure new assertions match the actual formatted output

## Performance Considerations

- Market data is fetched in parallel using `Promise.all()`
- Each Yahoo Finance request should take ~1-2 seconds
- Total execution time is typically 5-10 seconds

## Future Improvements

- [ ] Database storage for historical data
- [ ] Price comparison with previous day
- [ ] Multiple language support
- [ ] Custom alert thresholds
- [ ] Dashboard UI for viewing reports
