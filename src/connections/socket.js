// dependencies
import {
  makeWASocket,
  fetchLatestBaileysVersion,
} from "@whiskeysockets/baileys";
import pino from "pino";

// import config
import config from "../configs/configs.js";

// import logger
import { logger } from "../lib/logger.js";

export const createSocket = async (auth) => {
  logger.debug("Socket", "Fetch latest baileys version...");

  const { version } = await fetchLatestBaileysVersion();

  logger.debug("Socket", `Using baileys v${version.join(".")}`);

  return makeWASocket({
    version,
    auth,
    logger: pino({ level: config.socket.loggerLevel }),
    browser: config.socket.browser,
    printQRInTerminal: false,
  });

  logger.debug("Socket", "Whatsapp socket created!");
};
