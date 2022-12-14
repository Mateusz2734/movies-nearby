import { FilterQuery } from "mongoose";
import Result from "../models/result.model";
import { ResultObject } from "../common/types";

export function createResult(input: ResultObject) {
  return Result.create(input);
}

export function findResultWithSpecificCriteria(
  input: FilterQuery<ResultObject>
) {
  return Result.findOne(input, {}, { lean: true });
}

export function deleteResultWithSpecificDate(input: FilterQuery<ResultObject>) {
  return Result.deleteMany(input);
}
