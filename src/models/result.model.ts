import { Schema, model, Document } from "mongoose";
import { ResultDocument } from "../common/types";

const resultSchema = new Schema<ResultDocument>({
  date: { type: String, required: true },
  city: { type: String, required: true },
  type: { type: String, required: true },
  cinema: { type: String, required: true },
  movies: { type: Object, required: true }
});

const Result = model<ResultDocument>("Result", resultSchema);

export default Result;
