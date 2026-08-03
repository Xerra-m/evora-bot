// src/createContext.js

// import helper
import { attachContextHelpers } from "./helpers.js";

export const createContext = (app, m, { body, prefix, command, args }) => {
  const ctx = {
    app,
    sock: app.sock,

    m,
    body,

    prefix,
    command,
    args,

    chat: m.key.remoteJid,
    sender: m.key.participant || m.key.remoteJid,

    isGroup: m.key.remoteJid.endsWith("@g.us"),
    fromMe: m.key.fromMe,
  };

  return attachContextHelpers(ctx);
};
