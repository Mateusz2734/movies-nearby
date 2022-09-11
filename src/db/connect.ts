import { connect } from "mongoose";
import config from "../config/default";

export async function connectWithDatabase(name: string) {
  try {
    await connect(config.db_url);
    console.log(`${name} connected with database.`);
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
  }
}
