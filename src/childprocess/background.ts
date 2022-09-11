import { chooseScraperAndExecute } from "../controllers/scrapers.controller";
import {
  createResult,
  findResultWithSpecificDateAndCinema,
} from "../services/db.service";
import { calculateDates } from "../utils/dates.util";
import { connectWithDatabase } from "../db/connect";
import { CinemaObject } from "../common/types";
import { log } from "../log/logger";

export async function backgroundScraping(slicedCinemaList: CinemaObject[]) {
  const dates: string[] = calculateDates();
  for (const date of dates) {
    for (const cinema of slicedCinemaList) {
      try {
        const foundResult = await findResultWithSpecificDateAndCinema({
          date: date,
          ...cinema,
        });
        if (!foundResult) {
          const result = await chooseScraperAndExecute(date, cinema);
          const savedResult = await createResult({ ...result });
          log.trace(`Saved ${savedResult.cinema} @ ${date}`);
        } else {
        }
      } catch (error) {
        log.error(error);
      }
    }
  }
  process.disconnect();
}

function startSpecificScraper() {
  const processName: string = process.argv[2];

  process.on("message", async (list: CinemaObject[]) => {
    connectWithDatabase(`Background process ${processName}`);
    await backgroundScraping(list);
    log.info(
      `[${new Date().toISOString()}] Background process ${processName} is up to date`
    );
  });
}

startSpecificScraper();
