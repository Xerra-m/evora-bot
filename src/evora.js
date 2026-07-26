import ping from "./commands/ping.js";

class Evora {
  constructor() {
    this.name = "Evora";
    this.version = "1.0.0";
    this.commands = new Map();
  }

  async loadCommands() {
    this.command.set(ping.name, ping);
    command.log("Evora log - Command Loaded!");
  }

  async start() {
    console.log(`Evora log - ${this.name} v${this.version} starting...`);

    const command = this.commands.get("ping");

    if (command) {
      await command.execute();
    }
  }
}

export default Evora;
