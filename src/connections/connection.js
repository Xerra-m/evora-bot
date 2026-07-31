import { DisconnectReason } from "@whiskeysockets/baileys";
import { Boom } from "@hapi/boom";
import qrcode from "qrcode-terminal";

import config from "../configs/configs.js";

export const registerConnection = (app) => {
  app.sock.ev.on("connection.update", (update) => {
    const { connection, lastDisconnect, qr } = update;

    if (qr) return qrcode.generate(qr, { small: true });

    switch (connection) {
      case "open": {
        console.log("Evora log - Bot connected!");
        break;
      }

      case "close": {
        const statusCode = new Boom(lastDisconnect?.error).output?.statusCode;
        const shouldReconnect = statusCode !== DisconnectReason.loggedOut;
        console.log(
          `Evora log - Connection timeout, reason: ${statusCode}, reconnecting...`,
        );
        if (shouldReconnect) {
          if (app.restarting) return;

          console.log(
            `Evora log - Reconnecting in ${config.reconnect.delay}ms`,
          );
          setTimeout(async () => {
            try {
              await app.restart();
            } finally {
              app.restarting = false;
            }
          }, config.reconnect.delay);
        } else {
          console.log(
            "Evora log - Logged out, hapus folder session dan restart",
          );
        }
        break;
      }

      case "connecting": {
        console.log("Evora log - Bot connecting...");
        break;
      }
    }
  });
};
