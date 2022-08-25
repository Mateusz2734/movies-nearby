import { CinemaObject, ResultObject } from "../common/types";
import { createResult, findResultWithSpecificDateAndCinema } from "../services/db.service";
import { Document } from "mongoose";

const cinemas = [
  { city: 'Żory', type: 'Na Starówce', cinema: 'Kino na Starówce Żory', lon: 18.695609005931395, lat: 50.04499124407674 },
  { city: 'Żory', type: 'Helios', cinema: 'Helios Żory', lon: 18.703087153668747, lat: 50.04526975763794, additionalInfo: 64 },
  { city: 'Rybnik', type: 'Multikino', cinema: 'Multikino Rybnik', lon: 18.543207710305587, lat: 50.09437565527905, additionalInfo: 'rybnik' }
];

export default async function searchResults(date: string, cinemas: CinemaObject[]) { //: ResultObject[]
  async function searchLogic(specificCinema: CinemaObject) {
    const { cinema } = specificCinema;
    const cinemaDocument = await findResultWithSpecificDateAndCinema({ date: date, cinema: cinema });
    return cinemaDocument;
  }

  const results: Document<unknown, any, ResultObject>[] = [];

  for (const cinema of cinemas) {
    const foundResult: Document<unknown, any, ResultObject> | null = await searchLogic(cinema);
    if (!foundResult) {
      const newResult: Document<unknown, any, ResultObject> = await createResult({ date: date, ...cinema, movies: [] });
      results.push(newResult);
    } else {
      results.push(foundResult);
    }
  }
  return results;
}