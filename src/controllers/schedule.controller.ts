import { scheduleJob, RecurrenceRule, Job } from "node-schedule";
import { startBackgroundScraping } from "../services/background.service";

const scrapingRule = new RecurrenceRule();
scrapingRule.hour = 0;
scrapingRule.tz = "Europe/Warsaw";

export function runScrapingScheduler() {
  scheduleJob(scrapingRule, () => {
    startBackgroundScraping();
  });
}
