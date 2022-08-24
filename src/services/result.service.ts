import { DocumentDefinition, FilterQuery } from "mongoose";
import Result from "../models/result.model";
import { ResultDocument } from "../common/types";

export function createResult(input: DocumentDefinition<ResultDocument>) {
  return Result.create(input);
}

export function findResultsWithSpecificDateAndCity(input: FilterQuery<ResultDocument>) {
  return Result.find(input, {}, { lean: true });
}
