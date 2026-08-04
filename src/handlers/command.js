// src/handlers/command.js

// import config
import config from "../configs/configs.js";

// import library
import { logger } from "../lib/logger.js";

// import context
import { createContext } from "../context/createContext.js";

export const handleCommands = async (app, m) => {
  const body =
    m.message?.conversation || m.message?.extendedTextMessage?.text || "";

  if (!body) return;

  const prefixes = [...config.command.prefix].sort(
    (a, b) => b.length - a.length,
  );

  const prefix = prefixes.find((p) => body.startsWith(p));

  if (!prefix) return;

  const args = body.slice(prefix.length).trim().split(/\s+/);

  let commandName = args.shift();

  if (!commandName) return;

  if (!config.command.caseSensitive) {
    commandName = commandName.toLowerCase();
  }

  const command = app.commands.get(commandName);

  if (!command) {
    logger.warn("Command", `Unknown Command: ${commandName}`);
    return;
  }

  const ctx = createContext(app, m, {
    body,
    prefix,
    command: commandName,
    args,
  });

  try {
    await command.execute(ctx);

    logger.info("Command", `Executed ${commandName} by ${ctx.sender}`);
  } catch (err) {
    logger.error("Command", `Failed to execute ${commandName}: ${err.message}`);
  }
};
