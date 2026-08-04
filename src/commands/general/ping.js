export default {
  name: "ping",
  aliases: ["p", "latency"],
  description: "test ping",

  async execute(ctx) {
    await ctx.reply("🏓 Pong!");
  },
};
