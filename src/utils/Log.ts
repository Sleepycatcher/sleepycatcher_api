import chalk from "chalk";

export const prefixes = {
  wait: chalk.cyan("wait") + "  -",
  error: chalk.red("error") + " -",
  warn: chalk.yellow("warn") + "  -",
  ready: chalk.green("ready") + " -",
  info: chalk.cyan("info") + "  -",
  event: chalk.magenta("event") + " -",
};

// détécter le jour et l'heure actuelle
const getCurrentDate = (): string => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  return `[${day}/${month}/${year}-${hours}:${minutes}:${seconds}]`;
};

// logger

const Log = {
  info: (...message: any[]) => {
    console.log(getCurrentDate(), prefixes.info, ...message);
  },
  warn: (...message: any[]) => {
    console.warn(getCurrentDate(), prefixes.warn, ...message);
  },
  error: (...message: any[]) => {
    console.error(getCurrentDate(), prefixes.error, ...message);
  },
  ready: (...message: any[]) => {
    console.log(getCurrentDate(), prefixes.ready, ...message);
  },
  wait: (...message: any[]) => {
    console.log(getCurrentDate(), prefixes.wait, ...message);
  },
  event: (...message: any[]) => {
    console.log(getCurrentDate(), prefixes.event, ...message);
  },
};

export default Log;
