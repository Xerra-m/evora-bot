// dependencies
import {
  makeWASocket,
  fetchLatestBaileysVersion,
} from "@whiskeysockets/baileys";
import pino from "pino";

// import config
import config from "../configs/configs.js";

export const createSocket = async (auth) => {
  const { version } = await fetchLatestBaileysVersion();

  return makeWASocket({
    version,
    auth,
    logger: pino({ level: config.socket.loggerLevel }),
    browser: config.socket.browser,
    printQRInTerminal: false,
  });
};
