import axios from 'axios';
import config from '../config/default';
import { geocodingResponse } from '../common/types';

export default async function encodeCity(city: string): Promise<geocodingResponse> {
  // Encode the city name to put in API Request
  const urlEncodedCity: string = encodeURI(city);
  // Send request to Geocoding API
  const apiResponse = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?appid=${config.geo_api_key}&q=${urlEncodedCity}&limit=1`);
  // Get longitude and latitude
  const { lon, lat } = apiResponse.data[0];
  return { city: city, lon: lon, lat: lat };
}
