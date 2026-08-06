// src/permissions/owner.js

// import config
import config from "../configs/configs.js";

const normalize = (jid) => {
  jid.split("@")[0].split(":")[0];
};

export const isOwner = (sender) => {
  const number = normalize(sender);

  return config.owner.numbers.includes(number);
};
