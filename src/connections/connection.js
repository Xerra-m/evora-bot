import { DisconnectReason } from "@whiskeysockets/baileys";
import { Boom } from "@hapi/boom";
import qrcode from "qrcode-terminal";

import config from "../configs/configs.js";

import { reconnect } from "./reconnect.js";

export const registerConnection = (app) => {
  app.sock.ev.on("connection.update", async (update) => {
    const { connection, lastDisconnect, qr } = update;

    if (qr && config.login.method === "qr") {
      qrcode.generate(qr, { small: true });
    }

    switch (connection) {
      case "open": {
        console.log("Evora log - Bot connected!");
        break;
      }

      case "close": {
        const statusCode = new Boom(lastDisconnect?.error).output?.statusCode;
        const shouldReconnect = statusCode !== DisconnectReason.loggedOut;
        console.log(`Evora log - Connection closed, reason: ${statusCode}`);
        if (shouldReconnect) {
          if (app.restarting) return;

          try {
            await reconnect(app);
          } finally {
            app.restarting = false;
          }
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
