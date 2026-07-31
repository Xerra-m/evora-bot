const colors = {
  reset: "\x1b[0m",
  gray: "\x1b[90m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  red: "\x1b[31m",
  cyan: "\x1b[36m",
};

const getTime = () => {
  return new Date().toLocaleTimeString("id-ID");
};

const log = (type, color, module, message) => {
  console.log(
    `${colors.gray}[${getTime()}]${colors.reset} ` +
      `${color}${type}${colors.reset} ` +
      `${module ? `[${module}]` : ""} ` +
      message,
  );
};

export const logger = {
  info(module, message) {
    log("INFO", colors.green, module, message);
  },
  warn(module, message) {
    log("WARN", colors.yellow, module, message);
  },
  error(module, message) {
    log("ERROR", colors.red, module, message);
  },
  debug(module, message) {
    log("DEBUG", colors.cyan, module, message);
  },
};
