import cinemaList from "../db/cinemaList.db";
import { chooseScraperAndExecute } from "../controllers/scrapers.controller";
import { createResult, findResultWithSpecificDateAndCinema } from "../services/db.service";
import { connectWithDatabase } from "../db/connect";

export async function backgroundScraping() {
  for (const cinema of cinemaList) {
    const dates = ["2022-08-27", "2022-08-28"];
    for (const date of dates) {
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
