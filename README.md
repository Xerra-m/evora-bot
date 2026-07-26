Evora Bot

<p align="center">
  A modular WhatsApp bot built with Node.js and Baileys.
</p>About

Evora is a collaborative WhatsApp bot project built by developers who want to create a scalable and maintainable bot system.

This project focuses on:

- Clean architecture
- Modular development
- Modern JavaScript practices
- Team collaboration workflow

Features

Current features:

- WhatsApp connection using Baileys
- ESM (ECMAScript Modules)
- Modular command system
- Command handler
- Logger system

Planned features:

- Auto command loader
- Event handler system
- Plugin system
- Permission system
- Owner system
- Database integration
- External API integration
- AI features

Tech Stack

- Node.js
- JavaScript (ESM)
- @whiskeysockets/baileys
- Pino Logger
- dotenv

Project Structure

evora/
│
├── index.js              # Application entry point
├── package.json
├── .env
├── session/              # WhatsApp authentication session
│
└── src/
    │
    ├── evora.js          # Main bot class
    │
    ├── commands/         # Bot commands
    │   └── ping.js
    │
    ├── events/           # WhatsApp events
    │
    ├── handlers/         # Command and event handlers
    │
    ├── lib/              # Core utilities
    │
    └── utils/            # Helper functions

Installation

Clone the repository:

git clone https://github.com/Xerra-m/evora-bot.git

Move into the project directory:

cd evora

Install dependencies:

npm install

Create environment configuration:

BOT_NAME=Evora
PREFIX=.

Running

Start the bot:

node index.js

Development mode:

npm run dev

Command Development

Create a command inside:

src/commands/

Example:

export default {
    name: "ping",

    async execute() {
        console.log("Pong!");
    }
};

Architecture

Evora uses a modular architecture:

WhatsApp
    |
    v
Baileys Client
    |
    v
Event Handler
    |
    v
Command Handler
    |
    v
Command Module

Collaboration Workflow

This project uses Git for team collaboration.

Recommended workflow:

main
 |
 └── dev
      |
      ├── feature/core-system
      |
      ├── feature/new-command
      |
      └── feature/api-integration

Development process:

1. Create a feature branch
2. Develop your changes
3. Commit your work
4. Push the branch
5. Create a Pull Request
6. Review and merge into "dev"

Contributors

Project contributors:

- Developer 1 — Core system, architecture, WhatsApp integration
- Developer 2 — Features, API integration, development support

Security

Do not commit these files:

.env
session/
node_modules/

The "session/" folder contains WhatsApp authentication data and must remain private.

Development Status

Evora is currently under active development.

The goal is to build a flexible WhatsApp bot platform with a clean and scalable architecture.

License

This project is for learning, development, and collaboration purposes.