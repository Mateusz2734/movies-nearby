import { DocumentDefinition, FilterQuery } from "mongoose";
import Result from "../models/result.model";
import { ResultObject } from "../common/types";

export function createResult(input: DocumentDefinition<ResultObject>) {
  return Result.create(input);
}

export function findResultWithSpecificDateAndCinema(input: FilterQuery<ResultObject>) {
  return Result.findOne(input, {}, { lean: true });
}
