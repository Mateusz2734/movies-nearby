import { connect } from 'mongoose';
import config from "../config/default";

export async function connectWithDatabase() {
  try {
    await connect(config.db_url);
    console.log("Connected with database.");
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    };
  };
};