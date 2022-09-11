import logger from "pino";
import dayjs from "dayjs";
import config from "../config/default.config";

export const log = logger({
  level: config.pino_log_level || "info",
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true,
    },
  },
  base: {
    pid: false,
  },
  timestamp: (): string =>
    `,"time":"${dayjs().format("YYYY-MM-DDTHH:mm:ssZ[Z]")}"`,
});
