// src/handlers/command.js

// import config
import config from "../configs/configs.js";

// import library
import { logger } from "../lib/logger.js";

// import parser
import { parseMessage } from "../parser/messageParser.js";

// import context
import { createContext } from "../context/createContext.js";

// import checker
import { checkPermission } from "../permissions/checkPermission.js";

export const handleCommands = async (app, m) => {
  const parsed = parseMessage(m);

  if (!parsed) return;

  const { body, prefix, command: commandName, args } = parsed;

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
    const allowed = await checkPermission(
      ctx,
      command.permission ?? Permissions.EVERYONE,
    );

    if (!allowed) {
      return await ctx.reply("Kamu tidak memiliki izin");
    }

    await command.execute(ctx);

    logger.info("Command", `Executed ${commandName} by ${ctx.sender}`);
  } catch (err) {
    logger.error("Command", `Failed to execute ${commandName}: ${err.message}`);
  }
};
