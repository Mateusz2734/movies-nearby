import { CinemaObject, GeocodingResponse } from "../common/types";
import cinemaList from "../db/cinemaList.db";
import calculateDistance from "./distance.util";

export function filterCinemasByDistance(
  radius: number,
  chosenCity: GeocodingResponse
): CinemaObject[] {
  const cinemasNearby: CinemaObject[] = cinemaList.filter(
    (cinema: CinemaObject) => calculateDistance(chosenCity, cinema) <= radius
  );
  return cinemasNearby;
}

export function filterCinemasByCity(chosenCity: string): CinemaObject[] {
  chosenCity = chosenCity.toLowerCase();
  const cinemasInCity: CinemaObject[] = cinemaList.filter(
    ({ city }: CinemaObject) => city.toLowerCase() === chosenCity
  );
  return cinemasInCity;
}
