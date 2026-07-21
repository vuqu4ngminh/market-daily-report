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

    // Format date in Vietnam timezone (GMT+7)
    const vietnamDate = new Date(new Date().getTime() + 7 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0]; // YYYY-MM-DD
    const vietnamTime = new Date(new Date().getTime() + 7 * 60 * 60 * 1000)
      .toLocaleTimeString("vi-VN"); // HH:MM:SS
    const today = `${vietnamDate} ${vietnamTime}`;

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
