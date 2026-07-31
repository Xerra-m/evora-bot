// import config
import config from "../configs/configs.js";

// import logger
import { logger } from "../lib/logger.js";

export const reconnect = async (app) => {
  logger.info("Socket", `Reconnecting in ${config.reconnect.delay}ms`);

  await new Promise((resolve) => setTimeout(resolve, config.reconnect.delay));

  await app.restart();
};
