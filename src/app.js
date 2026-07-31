// dependencies
import { useMultiFileAuthState } from "@whiskeysockets/baileys";

// import connection handler
import { createSocket } from "./connections/socket.js";
import { registerConnection } from "./connections/connection.js";
import { login } from "./connections/login.js";

// import config
import config from "./configs/configs.js";

class Evora {
  constructor() {
    this.sock = null;
    this.authState = null;
    this.saveCreds = null;
    this.restarting = false;
  }

  async start() {
    const { state, saveCreds } = await useMultiFileAuthState(
      config.session.path,
    );

    this.authState = state;
    this.saveCreds = saveCreds;

    this.sock = await createSocket(state);

    registerConnection(this);

    this.sock.ev.on("creds.update", saveCreds);

    await login(this);
  }

  async restart() {
    console.log("Evora log - Bot restarting...");

    this.sock?.end?.();

    await this.start();
  }
}

export default Evora;
