// dependencies
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

// path handler
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class MessageHandler {
  constructor(sock) {
    this.sock = sock;
    this.commands = new Map();
    this.loadCommands();
  }

  async loadCommands() {
    try {
      // get command directory location
      const commandsDir = path.join(__dirname, "../commands");

      // read commands directory
      const commandsFile = await fs.readdir(commandsDir);
      const jsFiles = commandsFile.filter((file) => file.endsWith(".js"));

      for (const file of jsFiles) {
        const module = await import(`../commands/${file}`);
        const command = module.default;

        if (command && command.name) {
          this.commands.set(command.name, command);

          if (command.aliases && Array.isArray(command.aliases)) {
            command.aliases.forEach((alias) =>
              this.commands.set(alias, command),
            );
          }
        }
      }
      console.log(`Evora log - All command loaded!`);
    } catch (err) {
      console.error(`Evora log - Failed to load commands ${err}`);
    }
  }

  async handleMessage(chatUpdate) {
    try {
      const m = chatUpdate.messages[0];
      if (!m.message) return;

      if (m.key.remoteJid === "status@broadcast") return;
      if (m.key.fromMe) return;

      const messageType = Object.keys(m.message)[0];
      let body = "";

      // check message type
      if (messageType === "conversation") {
        body = m.message.conversation;
      } else if (messageType === "extendedTextMessage") {
        body = m.message.extendedTextMessage.text;
      } else if (messageType === "imageMessage") {
        body = m.message.imageMessage.caption || "";
      }

      // prefix
      const prefix = ".";
      if (!body.startsWith(prefix)) return;

      // separate the command name and its arguments
      const args = body.slice(prefix.length).trim().split(/ +/);
      const commandName = args.shift().toLowerCase();

      // Check if the command is registered in the Map.
      const command = this.commands.get(commandName);
      if (!command) return;

      console.log(
        `Evora log - ${commandName} di-trigger oleh ${m.key.remoteJid}`,
      );
      await command.execute({ sock: this.sock, m, args, body, prefix });
    } catch (err) {
      console.error(`Evora log - Error handling message: ${err}`);
    }
  }
}

export default MessageHandler;
