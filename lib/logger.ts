import winston from "winston";

const logFormat = winston.format.printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level.toUpperCase()}]: ${message}`;
});

const logger = winston.createLogger({
  level: process.env.NODE_ENV === "production" ? "info" : "debug",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.prettyPrint(),
    logFormat,
  ),
  transports: [new winston.transports.Console()],
});

export default logger;
