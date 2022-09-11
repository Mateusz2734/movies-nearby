import { CinemaObject, GeocodingResponse } from "../common/types";
import cinemaList from "../db/cinemaList.db";
import calculateDistance from "./distance.util";

export default function filterCinemasByDistance(
  radius: number,
  chosenCity: GeocodingResponse
): CinemaObject[] {
  const cinemasNearby: CinemaObject[] = cinemaList.filter(
    (cinema: CinemaObject) => calculateDistance(chosenCity, cinema) <= radius
  );
  return cinemasNearby;
}
