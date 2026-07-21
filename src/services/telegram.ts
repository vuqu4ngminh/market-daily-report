import axios from "axios";
import logger from "../utils/logger.js";

export async function sendTelegram(
  token: string,
  chatId: string,
  message: string,
  testMode: boolean = false
): Promise<void> {
  if (testMode) {
    logger.info("TEST MODE: Telegram message prepared (not sent)");
    logger.debug({ message }, "Message content");
    return;
  }

  try {
    const url = `https://api.telegram.org/bot${token}/sendMessage`;

    const response = await axios.post(url, {
      chat_id: chatId,
      text: message,
      parse_mode: "Markdown",
    });

    logger.info("✅ Telegram message sent successfully");
  } catch (error) {
    logger.error("❌ Failed to send Telegram message:", error);
    throw error;
  }
}
