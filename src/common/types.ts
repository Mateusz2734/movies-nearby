export interface CinemaObject {
  city: string,
  type: string,
  cinema: string,
  lon: number,
  lat: number,
  additionalInfo?: string | number;
}

export interface geocodingResponse {
  city: string,
  lon: number,
  lat: number;
}

export interface ResultDocument extends Document {
  date: string,
  type: string,
  city: string,
  cinema: string,
  movies: object,
}