import axios from "axios";
import logger from "../utils/logger.js";

export async function sendTelegram(
  token: string,
  chatId: string,
  message: string,
  testMode: boolean = false
): Promise<void> {
  try {
    const url = `https://api.telegram.org/bot${token}/sendMessage`;
    const outgoingMessage = testMode ? `*[TEST]*\n${message}` : message;

    await axios.post(url, {
      chat_id: chatId,
      text: outgoingMessage,
      parse_mode: "Markdown",
    });

    logger.info(
      testMode
        ? "✅ TEST MODE: Telegram message sent successfully"
        : "✅ Telegram message sent successfully"
    );
  } catch (error: unknown) {
    logger.error("❌ Failed to send Telegram message:", error);
    const requestError = error as {
      response?: { status?: number };
      code?: string;
    };
    throw {
      provider: "telegram",
      status: requestError.response?.status,
      code: requestError.code,
      message: "Telegram request failed",
    };
  }
}
