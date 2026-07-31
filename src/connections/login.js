// dependencies
import { createInterface } from "readline/promises";
import { stdin as input, stdout as output } from "process";

// import config
import config from "../configs/configs.js";

// import logger
import { logger } from "../lib/logger.js";

export const login = async (app) => {
  if (app.authState.creds.registered) return;

  if (config.login.method === "pairing") {
    const rl = createInterface({
      input,
      output,
    });
    logger.warn(
      "Login",
      "Bot belum terdaftar. Silahkan Masukkan nomor whatsapp.",
    );

    let phoneNumber = await rl.question(
      "evora@root $ Masukkan nomor whatsapp(diawali 62, contoh: 628xxxxxxx): ",
    );
    rl.close();

    phoneNumber = phoneNumber.replace(/\D/g, "");

    try {
      const code = await app.sock.requestPairingCode(phoneNumber);
      logger.info("Login", `Pairing code: ${code}`);
    } catch (err) {
      logger.error("Login", `Gagal meminta pairing code, ${err}`);
    }
  }
};
