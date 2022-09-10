import { MovieObject, ResultObject } from "../common/types";
import { Document } from "mongoose";

export function findTitle(
  input: Document<unknown, any, ResultObject>[],
  name: string
): ResultObject[] {
  let results: ResultObject[] = JSON.parse(JSON.stringify(input));
  name = name.toLowerCase();
  results.map((result: ResultObject) => {
    result.movies = result.movies.filter((movie: MovieObject): boolean =>
      movie.title.toLowerCase().includes(name)
    );
  });
  return results;
}
