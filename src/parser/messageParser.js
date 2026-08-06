// src/parser/messageParser.js

// import config
import config from "../configs/configs.js";

export const parseMessage = (m) => {
  const body =
    m.message?.conversation || m.message?.extendedTextMessage?.text || "";

  if (!body) return null;

  const prefixes = [...config.command.prefix].sort(
    (a, b) => b.length - a.length,
  );

  const prefix = prefixes.find((p) => body.startsWith(p));

  if (!prefix) return null;

  const args = body.slice(prefix.length).trim().split(/\s+/);

  let command = args.shift();

  if (!command) return null;

  switch (config.command.caseSensitive) {
    case true: {
      break;
    }

    case false: {
      command = command.toLowerCase();
      break;
    }
  }

  return {
    body,
    prefix,
    command,
    args,
  };
};
