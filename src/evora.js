// dependencies
import {
  makeWASocket,
  fetchLatestBaileysVersion,
  useMultiFileAuthState,
  DisconnectReason,
} from "@whiskeysockets/baileys";
import { Boom } from "@hapi/boom";
import pino from "pino";
import { createInterface } from "readline/promises";
import { stdin as input, stdout as output } from "process";

// import handlers
import MessageHandler from "./handlers/messageHandler.js";

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

    const { version } = await fetchLatestBaileysVersion();

    this.sock = makeWASocket({
      version,
      logger: pino({ level: "silent" }),
      auth: state,
      browser: ["Chrome (Linux)", "", ""],
    });

    if (!this.sock.authState.creds.registered) {
      const rl = createInterface({ input, output });
      console.log(
        "\nEvora log - Bot belum terdaftar. Silakan masukkan nomor whatsapp.",
      );
      let phoneNumber = await rl.question(
        `Masukkan No Whatsapp (awali 62, contoh: 628xxxxxxxxx): `,
      );
      rl.close();

      phoneNumber = phoneNumber.replace(/[^0-9]/g, "");

      setTimeout(async () => {
        try {
          let code = await this.sock.requestPairingCode(phoneNumber);
          code = code?.match(/.{1,4}/g)?.join("-") || code;
          console.log(`Pairing Code: ${code}`);
        } catch (err) {
          console.log(`Evora log - Gagal meminta pairing code, error: ${err}`);
        }
      }, 3000);
    }

    // initialize message handler
    const messageHandler = new MessageHandler(this.sock, {
      name: this.name,
      description: this.description,
      version: this.version,
      author: this.author,
    });

    // handler for message
    this.sock.ev.removeAllListeners("messages.upsert");
    this.sock.ev.on("messages.upsert", async (chatUpdate) => {
      await messageHandler.handleMessage(chatUpdate);
    });

    // handler save creds if there are change
    this.sock.ev.removeAllListeners("creds.update");
    this.sock.ev.on("creds.update", saveCreds);

    this.sock.ev.removeAllListeners("connection.update");
    this.sock.ev.on("connection.update", (update) => {
      console.log(update);
      const { connection, lastDisconnect, qr } = update;

      // auto connect handler
      if (connection === "close") {
        const statusCode = lastDisconnect?.error?.output?.statusCode;
        const shouldReconnect = statusCode !== DisconnectReason.loggedOut;

        console.log(
          `Evora log - Connection timeout, reason: ${statusCode}, reconnecting...`,
        );

        if (shouldReconnect) {
          setTimeout(() => this.start(), 3000);
        } else {
          console.log(`Evora log - logged out, scan qrcode for log in`);
        }
      } else if (connection === "open") {
        console.log(`Evora log - Connected 🟢`);
      }
    });
  }
}

export default Evora;
