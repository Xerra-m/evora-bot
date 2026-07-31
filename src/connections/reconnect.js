import config from "../configs/configs.js";

export const reconnect = async (app) => {
  console.log(`Evora log - Reconnecting in ${config.reconnect.delay}ms`);

  await new Promise((resolve) => setTimeout(resolve, config.reconnect.delay));

  await app.restart();
};
