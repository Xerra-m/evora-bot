// src/permissions/admin.js

export const isAdmin = async (ctx) => {
  console.log("isAdmin called");
  if (!ctx.isGroup) return false;

  const metadata = await ctx.sock.groupMetadata(ctx.chat);

  console.log(metadata.participants);

  return metadata.participants.some(
    (participant) =>
      participant.id === ctx.sender && participant.admin !== null,
  );
};
