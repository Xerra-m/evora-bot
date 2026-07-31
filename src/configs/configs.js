// dependencies
import dotenv from "dotenv";

dotenv.config();

export default {
  app: {
    name: "Evora",
    version: "1.0.0",
    author: "Xerra Magani & Minzy",
    description: "A modular WhatsApp bot built with Node.js & Baileys",
  },
  session: {
    path: "./session",
  },
  socket: {
    browser: ["Ubuntu", "Chrome", "20.0.04"],
    loggerLevel: "silent",
  },
  reconnect: {
    delay: 3000,
  },
  login: {
    method: "pairing",
  },
};
