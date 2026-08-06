import { Permissions } from "../../permissions/constants.js";

export default {
  name: "ping",
  aliases: ["p", "latency", "test"],
  description: "test ping or latency",
  permission: Permissions.ADMIN,

  async execute(ctx) {
    await ctx.reply("🏓 Pong!");
  },
};
