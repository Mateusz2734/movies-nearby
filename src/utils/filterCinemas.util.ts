import { CinemaObject, geocodingResponse } from "../common/types";
import cinemaList from "./cinemaList.util";
import calculateDistance from "./distance.util";

export default function filterCinemas(radius: number, chosenCity: geocodingResponse): Array<CinemaObject> {
  const cinemasNearby: CinemaObject[] = cinemaList.filter((cinema: CinemaObject) => calculateDistance(chosenCity, cinema) <= radius);
  return cinemasNearby;
}
