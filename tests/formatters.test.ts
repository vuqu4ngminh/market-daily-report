import { describe, it, expect } from "vitest";
import { formatTelegramMessage } from "../src/formatters/telegram.js";
import { formatEmailMessage } from "../src/formatters/email.js";
import { MarketData } from "../src/services/marketData.js";

const mockMarketData: MarketData = {
  SPX: {
    close: 4500.25,
    previousClose: 4480.0,
    percent_change: "+0.45%",
  },
  DJI: {
    close: 35000.0,
    previousClose: 34900.0,
    percent_change: "+0.29%",
  },
  IXIC: {
    close: 14200.5,
    previousClose: 14100.0,
    percent_change: "+0.71%",
  },
  BRENT: {
    close: 82.5,
    previousClose: 80.0,
    percent_change: "+3.13%",
  },
  WTI: {
    close: 78.25,
    previousClose: 76.0,
    percent_change: "+2.96%",
  },
  GOLD: {
    close: 1950.5,
    previousClose: 1940.0,
    percent_change: "+0.54%",
  },
  BTC: {
    close: 45000.0,
    previousClose: 44000.0,
    percent_change: "+2.27%",
  },
  ETH: {
    close: 2500.0,
    previousClose: 2450.0,
    percent_change: "+2.04%",
  },
};

const mockMarketDataWithLosses: MarketData = {
  ...mockMarketData,
  SPX: {
    close: 4400.0,
    previousClose: 4500.0,
    percent_change: "-2.22%",
  },
};

describe("Formatters", () => {
  describe("formatTelegramMessage", () => {
    it("should format market data for Telegram", () => {
      const message = formatTelegramMessage(mockMarketData);

      expect(message).toContain("CẬP NHẬT THỊ TRƯỜNG THẾ GIỚI");
      expect(message).toContain("S&P 500");
      expect(message).toContain("Dow Jones");
      expect(message).toContain("Nasdaq");
      expect(message).toContain("Bitcoin");
      expect(message).toContain("Ethereum");
    });

    it("should include price data in telegram message", () => {
      const message = formatTelegramMessage(mockMarketData);

      expect(message).toContain("4500.25");
      expect(message).toContain("+0.45%");
      expect(message).toContain("1950.5");
      expect(message).toContain("2500");
      expect(message).toContain("+2.04%");
    });

    it("should have proper sections", () => {
      const message = formatTelegramMessage(mockMarketData);

      expect(message).toContain("Chứng khoán Mỹ");
      expect(message).toContain("Vàng & Dầu");
      expect(message).toContain("Cryptocurrency");
      expect(message).toContain("Bitcoin");
    });
  });

  describe("formatEmailMessage", () => {
    it("should format market data for Email", () => {
      const message = formatEmailMessage(mockMarketData);

      expect(message).toContain("CẬP NHẬT THỊ TRƯỜNG THẾ GIỚI");
      expect(message).toContain("<!DOCTYPE html>");
      expect(message).toContain("color");
    });

    it("should include HTML formatting", () => {
      const message = formatEmailMessage(mockMarketData);

      expect(message).toContain("<html");
      expect(message).toContain("</html>");
      expect(message).toContain("<style>");
      expect(message).toContain("green");
    });

    it("should show red color for negative changes", () => {
      const message = formatEmailMessage(mockMarketDataWithLosses);

      expect(message).toContain("color:red");
    });

    it("should include all market assets", () => {
      const message = formatEmailMessage(mockMarketData);

      expect(message).toContain("S&P 500");
      expect(message).toContain("Dow Jones");
      expect(message).toContain("Nasdaq");
      expect(message).toContain("Vàng");
      expect(message).toContain("Bitcoin");
      expect(message).toContain("Ethereum");
    });

    it("should include proper HTML tags", () => {
      const message = formatEmailMessage(mockMarketData);

      expect(message).toContain("<h2>");
      expect(message).toContain("<h3>");
      expect(message).toContain("<p>");
      expect(message).toContain("</p>");
    });
  });
});
