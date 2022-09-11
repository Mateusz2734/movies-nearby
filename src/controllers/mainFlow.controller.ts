import { Request, Response } from "express";
import { CinemaObject, GeocodingResponse } from "../common/types";
import encodeCity from "../services/geocoding.service";
import { filterCinemasByDistance } from "../utils/filterCinemas.util";
import searchResults from "../utils/searchResults.util";

export default async function mainFlowHandler(
  req: Request,
  res: Response
): Promise<void> {
  const { city, radius, date } = req.body;
  if (!city || !radius || !date) {
    res.status(400).json({ error: "Please, fill all inputs" });
  }
  try {
    const encodedCity: GeocodingResponse = await encodeCity(city);
    const cinemasNearby: CinemaObject[] = await filterCinemasByDistance(
      radius,
      encodedCity
    );
    const results = await searchResults(date, cinemasNearby);
    res.status(200).json({ results: results });
  } catch (error) {
    res.status(500).json({ error: "Unexpected server error" });
  }
}
