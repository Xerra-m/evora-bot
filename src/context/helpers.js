// src/context/helpers.js

export const attachHelpers = (ctx) => {
  // reply
  ctx.reply = async (text, options = {}) => {
    return ctx.sock.sendMessage(
      ctx.chat,
      {
        text,
        ...options,
      },
      {
        quoted: ctx.m,
      },
    );
  };

  // react
  ctx.react = async (emoji) => {
    return ctx.sock.sendMessage(ctx.chat, {
      react: {
        text: emoji,
        key: ctx.m.key,
      },
    });
  };

  // send
  ctx.send = async (content) => {
    return ctx.sock.sendMessage(ctx.chat, content);
  };

  return ctx;
};
