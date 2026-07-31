import { createInterface } from "readline/promises";
import { stdin as input, stdout as output } from "process";

import config from "../configs/configs.js";

export const login = async (app) => {
  if (app.authState.creds.registered) return;

  if (config.login.method === "pairing") {
    const rl = createInterface({
      input,
      output,
    });
    console.log(
      "Evora log - Bot belum terdaftar. Silahkan Masukkan nomor whatsapp.",
    );

    let phoneNumber = await rl.question(
      "evora@root $ Masukkan nomor whatsapp(diawali 62, contoh: 628xxxxxxx): ",
    );
    rl.close();

    phoneNumber = phoneNumber.replace(/\D/g, "");

    try {
      const code = await app.sock.requestPairingCode(phoneNumber);
      console.log(`Evora log - Pairing code: ${code}`);
    } catch (err) {
      console.error(`Evora log - Gagal meminta pairing code, ${err}`);
    }
  }
};
