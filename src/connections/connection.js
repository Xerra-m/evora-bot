// dependencies
import { DisconnectReason } from "@whiskeysockets/baileys";
import { Boom } from "@hapi/boom";
import qrcode from "qrcode-terminal";

// import config
import config from "../configs/configs.js";

// import handler
import { reconnect } from "./reconnect.js";

// import logger
import { logger } from "../lib/logger.js";

export const registerConnection = (app) => {
  app.sock.ev.on("connection.update", async (update) => {
    const { connection, lastDisconnect, qr } = update;

    if (qr && config.login.method === "qr") {
      qrcode.generate(qr, { small: true });
    }

    switch (connection) {
      case "open": {
        logger.info("Socket", "Bot connected!");
        logger.info("App", "Evora is ready🚀");
        break;
      }

      case "close": {
        app.restarting = true;

        const statusCode = new Boom(lastDisconnect?.error).output?.statusCode;
        const shouldReconnect = statusCode !== DisconnectReason.loggedOut;

        logger.error("Connection", `Connection closed, reason: ${statusCode}`);

        if (shouldReconnect) {
          if (app.restarting) return;

          try {
            await reconnect(app);
          } finally {
            app.restarting = false;
          }
        } else {
          logger.warn("Socket", "Logged out, hapus folder session dan restart");
        }
        break;
      }

      case "connecting": {
        logger.info("Connection", "Bot connecting...");
        break;
      }
    }
  });
};
