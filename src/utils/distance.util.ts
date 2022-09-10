import { CinemaObject, GeocodingResponse } from "../common/types";

export default function calculateDistance(
  chosenCity: GeocodingResponse,
  cinema: CinemaObject
): number {
  const { lat: lat1, lon: lon1 } = chosenCity;
  const { lat: lat2, lon: lon2 } = cinema;
  const dividedPi: number = 0.017453292519943295; // Math.PI / 180
  const cos = Math.cos;
  const partial: number =
    0.5 -
    cos((lat2 - lat1) * dividedPi) / 2 +
    (cos(lat1 * dividedPi) *
      cos(lat2 * dividedPi) *
      (1 - cos((lon2 - lon1) * dividedPi))) /
      2;
  const factor: number = 10 ** 2;
  const result: number =
    Math.round(12742 * Math.asin(Math.sqrt(partial)) * factor) / factor;
  return result;
}
