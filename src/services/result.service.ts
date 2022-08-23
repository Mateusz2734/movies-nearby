import { DocumentDefinition, FilterQuery } from "mongoose";
import Result, { ResultDocument } from "../models/result.model";

export function createResult(input: DocumentDefinition<ResultDocument>) {
  return Result.create(input);
}

export function findResultsWithSpecificDateAndCity(input: FilterQuery<ResultDocument>) {
  return Result.find(input, {}, { lean: true });
}
