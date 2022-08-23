import { geocodingResponse } from "../services/geocoding.service";

export default function distance(chosenCity: geocodingResponse, lat2: number, lon2: number): number {
  const { lat: lat1, lon: lon1 } = chosenCity;
  const dividedPi: number = 0.017453292519943295;    // Math.PI / 180
  const cos = Math.cos;
  const partial: number = 0.5 - cos((lat2 - lat1) * dividedPi) / 2 + cos(lat1 * dividedPi) * cos(lat2 * dividedPi) * (1 - cos((lon2 - lon1) * dividedPi)) / 2;
  const result: number = 12742 * Math.asin(Math.sqrt(partial));
  return result;
}
