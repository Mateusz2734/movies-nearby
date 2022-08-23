import { Schema, model, Document } from "mongoose";

export interface ResultDocument extends Document {
  date: string,
  type: string,
  city: string,
  cinema: string,
  movies: object,
}

const resultSchema = new Schema<ResultDocument>({
  date: { type: String, required: true },
  city: { type: String, required: true },
  type: { type: String, required: true },
  cinema: { type: String, required: true },
  movies: { type: Object, required: true }
});

const Result = model<ResultDocument>("Result", resultSchema);

export default Result;
