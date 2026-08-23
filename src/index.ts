import { getConfig } from "./config/config.js";
import { getMarketData } from "./services/marketData.js";
import { sendTelegram } from "./services/telegram.js";
import { sendEmail } from "./services/email.js";
import { formatTelegramMessage } from "./formatters/telegram.js";
import { formatEmailMessage } from "./formatters/email.js";
import logger from "./utils/logger.js";

async function main(): Promise<void> {
  try {
    logger.info("🚀 Starting Market Daily Report...");

    const config = getConfig();

    logger.info("📡 Fetching market data from Yahoo Finance...");
    const marketData = await getMarketData();
    logger.info("✅ Market data fetched successfully");

    const telegramMessage = formatTelegramMessage(marketData);
    const emailMessage = formatEmailMessage(marketData);

    logger.info("📤 Sending Telegram message...");
    await sendTelegram(
      config.telegram.token,
      config.telegram.chatId,
      telegramMessage,
      config.testMode
    );

    logger.info("📧 Sending Email...");
    await sendEmail(
      config.email.user,
      config.email.password,
      config.email.recipient,
      emailMessage,
      config.testMode
    );

    logger.info("✨ Market Daily Report completed successfully!");
  } catch (error) {
    logger.error("❌ Error in Market Daily Report:", error);
    process.exit(1);
  }
}

main();
