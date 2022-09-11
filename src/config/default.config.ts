import dotenv from "dotenv";

dotenv.config();

export default {
  db_url: process.env.DB_URL as string,
  geo_api_key: process.env.GEO_API_KEY as string,
  pino_log_level: "trace",
};
