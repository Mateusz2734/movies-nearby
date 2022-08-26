import { CinemaObject } from "../common/types";
import scrapers from "../scrapers/default";

export async function chooseScraperAndExecute(date: string, input: CinemaObject) {
  if (input.type === "Helios") {
    const result = await scrapers.helios(date, input);
    return result;
  } else if (input.type === "Cinema City") {
    const result = await scrapers.cinemaCity(date, input);
    return result;
  } else if (input.type === "Multikino") {
    const result = await scrapers.multikino(date, input);
    return result;
  } else {
    const result = await scrapers.naStarowce(date);
    return result;
  }
}