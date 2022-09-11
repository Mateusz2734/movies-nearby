import { CinemaObject, ResultObject } from "../common/types";
import {
  createResult,
  findResultWithSpecificDateAndCinema,
} from "../services/db.service";
import { chooseScraperAndExecute } from "../controllers/scrapers.controller";
import { Document } from "mongoose";
import { omit } from "lodash";

export default async function searchResults(
  date: string,
  cinemas: CinemaObject[]
) {
  async function searchLogic(specificCinema: CinemaObject) {
    const { cinema } = specificCinema;
    const cinemaDocument = await findResultWithSpecificDateAndCinema({
      date: date,
      cinema: cinema,
    });
    return cinemaDocument;
  }

  const results: Document<unknown, any, ResultObject>[] = [];

  for (const cinema of cinemas) {
    const foundResult = await searchLogic(cinema);
    if (!foundResult) {
      const newResult = await chooseScraperAndExecute(date, cinema);
      const newResultDocument = await createResult({ ...newResult });
      results.push(omit(newResultDocument, ["_id", "type", "__v"]));
    } else {
      results.push(omit(foundResult, ["_id", "type", "__v"]));
    }
  }
  return results;
}
