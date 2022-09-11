import { connect } from "mongoose";
import config from "../config/default.config";
import { log } from "../log/logger";

export async function connectWithDatabase(name: string) {
  try {
    await connect(config.db_url);
    log.info(`${name} connected with database.`);
  } catch (error) {
    if (error instanceof Error) {
      log.error(error.message);
    }
  }
}
