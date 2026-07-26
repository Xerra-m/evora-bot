// dependencies
import makeWASocket, {
  useMultiFileAuthState,
  DisconnectReason,
} from "@whiskeysockets/baileys";
import { Boom } from "@hapi/boom";
import pino from "pino";
import qrcode from "qrcode-terminal";

class Evora {
  constructor() {
    this.name = "Evora";
    this.version = "1.0.0";
    this.author = "Xerra Magani & Minzy";
    this.description = "A modular WhatsApp bot build with node.js & baileys";
    this.sock = null;
  }

  async start() {
    // save cred to session folder in root folder
    const { state, saveCreds } = await useMultiFileAuthState("../session");

    this.sock = makeWASocket({
      logger: pino({ level: "silent" }),
      auth: state,
    });

    // handler save creds if there are change
    this.sock.ev.on("creds.update", saveCreds);

    this.sock.ev.on("connection.update", (update) => {
      const { connection, lastDisconnect, qr } = update;

      // generate qr di terminal
      if (qr) {
        qrcode.generate(qr, { small: true });
      }

      // auto connect handler
      if (connection === "close") {
        const shouldReconnect =
          (lastDisconnect?.error instanceof Boom)?.output?.statusCode !==
          DisconnectReason.loggedOut;
        if (shouldReconnect) this.start();
      } else if (connection === "open") {
        console.log(`Evora log - ${this.name} v${this.version} starting...`);
      }
    });
  }
}
