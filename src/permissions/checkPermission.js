// src/permissions/checkPermission;

// import constant variable
import { Permissions } from "./constants.js";

// import permission checker
import { isOwner } from "./owner.js";
import { isAdmin } from "./admin.js";

export const checkPermission = async (ctx, permission) => {
  switch (permission) {
    case Permissions.EVERYONE: {
      return true;
    }

    case Permissions.OWNER: {
      return isOwner(ctx);
    }

    case Permissions.ADMIN: {
      return isAdmin(ctx);
    }

    case Permissions.PREMIUM: {
      return false;
    }

    default: {
      return false;
    }
  }
};
