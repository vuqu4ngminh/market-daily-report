const VIETNAM_TIME_ZONE = "Asia/Ho_Chi_Minh";

export function isVietnamMarketReportingTime(date: Date = new Date()): boolean {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: VIETNAM_TIME_ZONE,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(date);

  const hour = Number(parts.find((part) => part.type === "hour")?.value);
  const minute = Number(parts.find((part) => part.type === "minute")?.value);
  const minutesSinceMidnight = hour * 60 + minute;

  return minutesSinceMidnight >= 9 * 60 && minutesSinceMidnight < 15 * 60;
}

export function shouldPrepareVn100Report(testMode: boolean, date: Date = new Date()): boolean {
  return testMode || isVietnamMarketReportingTime(date);
}
