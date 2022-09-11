import { scheduleJob, RecurrenceRule } from "node-schedule";
import { startBackgroundScraping } from "../services/background.service";

const scrapingRule = new RecurrenceRule();
scrapingRule.minute = 0;
scrapingRule.hour = 0;
scrapingRule.tz = "Europe/Warsaw";

export function runScrapingScheduler() {
  scheduleJob(scrapingRule, () => {
    startBackgroundScraping();
  });
}
