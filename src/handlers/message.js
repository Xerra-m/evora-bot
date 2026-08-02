import { logger } from "../lib/logger.js";

export const registerMessageHandler = (app) => {
  app.sock.ev.on("messages.upsert", async ({ messages }) => {
    try {
      const m = messages?.[0];

      // message filtering
      if (!m) return;
      if (!m.message) return;
      if (m.key.remoteJid === "status@broadcast") return;
      // if (m.key.fromMe) return;

      const body =
        m.message?.conversation || m.message?.extendedTextMessage?.text || "";

      logger.debug(
        "Message",
        `Received message from ${m.key.remoteJid}: ${body}`,
      );
    } catch (err) {
      logger.error("Message", `Failed to handle message: ${err.message}`);
    }
  });
};
