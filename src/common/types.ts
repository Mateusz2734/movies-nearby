export interface CinemaObject {
  city: string;
  type: string;
  cinema: string;
  lon: number;
  lat: number;
  additionalInfo?: string | number;
}

export interface GeocodingResponse {
  city: string;
  lon: number;
  lat: number;
}

export interface ResultObject {
  date: string;
  city: string;
  type: string;
  cinema: string;
  movies: MovieObject[];
}

export interface MovieObject {
  title: string;
  time: string[];
}
