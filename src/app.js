// src/app.js

// dependencies
import { useMultiFileAuthState } from "@whiskeysockets/baileys";

// import connection handler
import { createSocket } from "./connections/socket.js";
import { registerConnection } from "./connections/connection.js";
import { login } from "./connections/login.js";

// import library
import { logger } from "./lib/logger.js";
import { loadCommands } from "./lib/loader.js";

// import handler
import { registerMessageHandler } from "./handlers/message.js";

// import config
import config from "./configs/configs.js";

class Evora {
  constructor() {
    this.sock = null;
    this.authState = null;
    this.saveCreds = null;
    this.restarting = false;

    this.commands = new Map();
  }

  async start() {
    const { state, saveCreds } = await useMultiFileAuthState(
      config.session.path,
    );

    logger.info("App", "Starting Evora...");

    // save state
    this.authState = state;
    this.saveCreds = saveCreds;

    // create socket
    this.sock = await createSocket(state);

    // register connection
    registerConnection(this);

    // save credential
    this.sock.ev.on("creds.update", saveCreds);

    // login method
    await login(this);

    // load command
    await loadCommands(this);

    // message handler
    registerMessageHandler(this);
  }

  async restart() {
    console.log("Evora log - Bot restarting...");

    this.sock?.end?.();

    await this.start();
  }
}

export default Evora;
