import { getConfig } from "./config/config.js";
import { getMarketData } from "./services/marketData.js";
import { sendTelegram } from "./services/telegram.js";
import { sendEmail } from "./services/email.js";
import {
  formatTelegramMessage,
  formatVn100TelegramMessage,
} from "./formatters/telegram.js";
import { formatEmailMessage } from "./formatters/email.js";
import logger from "./utils/logger.js";
import { getDnseMarketData, getVn100MarketData } from "./services/dnse.js";
import { shouldPrepareVn100Report } from "./utils/vietnamMarketHours.js";

async function main(): Promise<void> {
  try {
    logger.info("🚀 Starting Market Daily Report...");

    const config = getConfig();

    logger.info("📡 Fetching market data from Yahoo Finance and DNSE...");
    const [marketData, vietnam] = await Promise.all([
      getMarketData(),
      getDnseMarketData(config.dnse),
    ]);
    marketData.vietnam = vietnam;
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

    if (shouldPrepareVn100Report(config.testMode)) {
      logger.info("📡 Fetching VN100 prices from DNSE...");
      const vn100 = await getVn100MarketData(config.dnse);
      await sendTelegram(
        config.telegram.token,
        config.telegram.chatId,
        formatVn100TelegramMessage(vn100),
        config.testMode
      );
    } else {
      logger.info("⏭️ Skipping VN100 report outside 09:00-15:00 Asia/Ho_Chi_Minh");
    }

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
