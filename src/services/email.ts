import nodemailer from "nodemailer";
import logger from "../utils/logger.js";

export async function sendEmail(
  emailUser: string,
  emailPassword: string,
  emailRecipient: string,
  htmlBody: string,
  testMode: boolean = false
): Promise<void> {
  if (testMode) {
    logger.info("TEST MODE: Email prepared (not sent)");
    logger.debug({ to: emailRecipient }, "Email recipient");
    return;
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: emailUser,
        pass: emailPassword,
      },
    });

    const now = new Date();
    const formatter = new Intl.DateTimeFormat("vi-VN", {
      timeZone: "Asia/Ho_Chi_Minh",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    const formatted = formatter.format(now).replace(",", "");
    const today = formatted.replace(/\//g, "-");

    await transporter.sendMail({
      from: emailUser,
      to: emailRecipient,
      subject: `CẬP NHẬT THỊ TRƯỜNG THẾ GIỚI ${today}`,
      html: htmlBody,
    });

    logger.info("✅ Email sent successfully");
  } catch (error) {
    logger.error("❌ Failed to send email:", error);
    throw error;
  }
}
