// src/handlers/command.js

// import config
import config from "../configs/configs.js";

// import library
import { logger } from "../lib/logger.js";

export const handleCommands = async (app, m) => {
  const body =
    m.message?.conversation || m.message?.extendedTextMessage?.text || "";

  if (!body) return;

  const prefixes = [...config.command.prefix].sort(
    (a, b) => b.length - a.length,
  );

  const prefix = prefixes.find((p) => body.startsWith(p));

  const args = body.slice(prefix.length).trim().split(/\s+/);

  let commandName = args.shift();

  if (!commandName) return;

  if (!config.command.caseSensitive) {
    commandName.toLowerCase();
  }

  const command = app.commands.get(commandName);

  if (!command) {
    logger.warn("Command", `Unknown Command: ${commandName}`);
    return;
  }

  const ctx = {
    app,
    sock: app.sock,

    m,
    body,

    prefix,
    command: commandName,
    args,

    chat: m.key.remoteJid,
    sender: m.key.participant || m.key.remoteJid,

    isGroup: m.key.remoteJid.endsWith("@g.us"),
    fromMe: m.key.fromMe,
    reply: async (text, options = {}) => {
      return app.sock.sendMessage(m.key.remoteJid, {
        text,
        ...options,
      });
    },
  };

  try {
    await command.execute(ctx);

    logger.info("Command", `Executed ${commandName} by ${ctx.sender}`);
  } catch (err) {
    logger.error("Command", `Failed to execute ${commandName}: ${err.message}`);
  }
};
