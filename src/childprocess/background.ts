import cinemaList from "../db/cinemaList.db";
import { chooseScraperAndExecute } from "../controllers/scrapers.controller";
import { createResult, findResultWithSpecificDateAndCinema } from "../services/db.service";
import { connectWithDatabase } from "../db/connect";
import { todayAndFiveNextDays } from "../utils/dates.util";

export async function backgroundScraping() {
  const dates: string[] = todayAndFiveNextDays();
  for (const date of dates) {
    for (const cinema of cinemaList) {
      try {
        const foundResult = await findResultWithSpecificDateAndCinema({ date: date, ...cinema });
        if (!foundResult) {
          const result = await chooseScraperAndExecute(date, cinema);
          const savedResult = await createResult({ ...result });
          console.log(`Saved ${savedResult.cinema} @ ${date}`);
        } else {
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
  console.log(`[${new Date().toISOString()}] Results are up to date`);
}

connectWithDatabase("Background");
backgroundScraping();
