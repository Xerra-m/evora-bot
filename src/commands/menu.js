export default {
  name: "menu",
  description: "Show bot menu",
  async execute(sock, m, args, body, prefix, botInfo) {
    try {
      // format uptime
      const formatUptime = (seconds) => {
        const d = Math.floor(seconds / (3600 * 24));
        const h = Math.floor((seconds % (3600 * 24)) / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = Math.floor(seconds % 60);

        let result = "";
        if (d > 0) result += `${d}d`;
        if (h > 0 || d > 0) result += `${h}h`;
        if (m > 0 || h > 0 || d > 0) result += `${m}m`;
        result += `${s}s`;
        return result;
      };

      const runtimeFormatted = formatUptime(process.uptime());

      // fetch data from Evora class
      const botName = botInfo?.name;
      const botVersion = botInfo?.version;
      const botAuthor = botInfo?.author;

      // menu text
      const menuText = `*${botName}*
      
      ╭━━ ( *𝙸𝚗𝚏𝚘𝚛𝚖𝚊𝚝𝚒𝚘𝚗* ) ━━ϟ
      ┃ *❏ Bot Name :*\`${botName}\`
      ┃ *❏ Bot Version : ${botVersion}*
      ┃ *❏ Prefix : ${prefix}*
      ┃ *❏ Status : Online 🟢*
      ┃ *❏ Creator : ${botAuthor}*
      ┃ *❏ Runtime : ${runtimeFormatted}*
      ╰━━━━━━━━━━━━━━━━ϟ`;

      await sock.sendMessage(
        m.key.remoteJid,
        {
          text: menuText,
        },
        { quoted: m },
      );
    } catch (err) {
      console.error(`Evora log - Error show menu, ${err}`);
      await sock.sendMessage(
        m.key.remoteJid,
        {
          text: "Gagal memuat menu.",
        },
        { quoted: m },
      );
    }
  },
};
