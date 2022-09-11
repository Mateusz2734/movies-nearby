import { Request, Response } from "express";
import { CinemaObject } from "../common/types";
import { filterCinemasByCity } from "../utils/filterCinemas.util";
import searchResults from "../utils/searchResults.util";

export default async function cityFlowHandler(
  req: Request,
  res: Response
): Promise<void> {
  const { city, date } = req.body;
  if (!city || !date) {
    res.status(400).json({ error: "Please, fill all inputs" });
  }
  try {
    const cinemasInChosenCity: CinemaObject[] = await filterCinemasByCity(city);
    const results = await searchResults(date, cinemasInChosenCity);
    res.status(200).json({ results: results });
  } catch (error) {
    res.status(500).json({ error: "Unexpected server error" });
  }
}
