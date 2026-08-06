// src/permissions/checkPermission;

// import constant variable
import { Permissions } from "./constants.js";

// import permission checker
import { isOwner } from "./owner.js";

export const checkPermission = async (ctx, permission) => {
  switch (permission) {
    case Permissions.EVERYONE: {
      return true;
    }

    case Permissions.OWNER: {
      return isOwner(ctx.sender);
    }

    case Permissions.ADMIN: {
      return false;
    }

    case Permissions.PREMIUM: {
      return false;
    }

    default: {
      return false;
    }
  }
};
