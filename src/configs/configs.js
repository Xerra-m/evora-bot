// src/configs/configs.js

// dependencies
import dotenv from "dotenv";

dotenv.config();

// import package.json
import pkg from "../../package.json" with { type: "json" };

export default {
  app: {
    name: pkg.name,
    version: pkg.version,
    author: pkg.author,
    description: pkg.description,
  },

  socket: {
    browser: ["Ubuntu", "Chrome", "20.0.04"],
    loggerLevel: "silent",
  },

  session: {
    path: "./session",
  },

  login: {
    method: "pairing",
  },

  reconnect: {
    delay: 3000,
  },

  command: {
    prefix: [".", ",", ";", "!", "@", "$", "&", "e!"],
    caseSensitive: false,
  },

  owner: {
    numbers: process.env.OWNER_NUMBERS
      ? process.env.OWNER_NUMBERS.split(",")
      : [],
  },
};
