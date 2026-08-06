import { Permissions } from "../../permissions/constants.js";

export default {
  name: "ping",
  aliases: ["p", "latency"],
  description: "test ping or latency",
  permission: Permissions.OWNER,

  async execute(ctx) {
    await ctx.reply("🏓 Pong!");
  },
};
