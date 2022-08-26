import { Schema, model } from "mongoose";
import { ResultObject } from "../common/types";

const resultSchema = new Schema<ResultObject>({
  date: { type: String, required: true },
  city: { type: String, required: true },
  type: { type: String, required: true },
  cinema: { type: String, required: true },
  movies: { type: [], required: true }
});

const Result = model<ResultObject>("Result", resultSchema);

export default Result;
