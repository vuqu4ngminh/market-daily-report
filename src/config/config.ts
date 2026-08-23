import dotenv from "dotenv";

dotenv.config();

export interface Config {
  telegram: {
    token: string;
    chatId: string;
  };
  email: {
    user: string;
    password: string;
    recipient: string;
  };
  logging: {
    level: string;
  };
  testMode: boolean;
}

function validateEnv(): void {
  const requiredVars = [
    "TELEGRAM_TOKEN",
    "TELEGRAM_CHAT_ID",
    "EMAIL_USER",
    "EMAIL_PASSWORD",
    "EMAIL_RECIPIENT",
  ];

  const missing = requiredVars.filter((v) => !process.env[v]);

  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(", ")}`);
  }
}

export function getConfig(): Config {
  validateEnv();

  return {
    telegram: {
      token: process.env.TELEGRAM_TOKEN!,
      chatId: process.env.TELEGRAM_CHAT_ID!,
    },
    email: {
      user: process.env.EMAIL_USER!,
      password: process.env.EMAIL_PASSWORD!,
      recipient: process.env.EMAIL_RECIPIENT!,
    },
    logging: {
      level: process.env.LOG_LEVEL || "info",
    },
    testMode: process.env.TEST_MODE === "true",
  };
}

export default getConfig();
