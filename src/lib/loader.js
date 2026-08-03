// src/lib/loader.js

// dependencies
import { readdir } from "fs/promises";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";

// import logger
import { logger } from "./logger.js";

// directory path handler
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const scanDirectory = async (dir) => {
  const entries = await readdir(dir, { withFileTypes: true });

  let files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      files.push(...(await scanDirectory(fullPath)));
      continue;
    }

    if (path.extname(entry.name) === ".js") {
      files.push(fullPath);
    }
  }
  return files;
};

export const loadCommands = async (app) => {
  const commandsPath = path.join(__dirname, "../commands");

  const commandFiles = await scanDirectory(commandsPath);

  let loaded = 0;

  for (const file of commandFiles) {
    try {
      const { default: command } = await import(pathToFileURL(file).href);

      if (!command?.name || typeof command.execute !== "function") {
        logger.warn(
          "Loader",
          `${path.basename(file)} bukan command yang valid.`,
        );
        continue;
      }

      app.commands.set(command.name, command);

      if (Array.isArray(command.aliases)) {
        for (const alias of command.aliases) {
          app.commands.set(alias, command);
        }
      }

      loaded++;
    } catch (err) {
      logger.error(
        "Loader",
        `Gagal memuat ${path.basename(file)}, reason: ${err.message}`,
      );
    }
  }

  logger.info("Loader", `Loaded ${loaded} commands`);
};
