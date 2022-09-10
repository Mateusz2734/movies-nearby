import { CinemaObject, GeocodingResponse } from "../common/types";
import cinemaList from "../db/cinemaList.db";
import calculateDistance from "./distance.util";

export default function filterCinemas(
  radius: number,
  chosenCity: GeocodingResponse
): Array<CinemaObject> {
  const cinemasNearby: CinemaObject[] = cinemaList.filter(
    (cinema: CinemaObject) => calculateDistance(chosenCity, cinema) <= radius
  );
  return cinemasNearby;
}
