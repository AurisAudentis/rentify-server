import * as winston from "winston";
import config from "../../config/config";

const transporters = {
    'dev': [new winston.transports.Console()],
    'prod': [new winston.transports.File({filename: "server.log"})]
};

const level = {
    'dev': "debug",
    'prod': "info"
};

export const logger = winston.createLogger({
    format: winston.format.simple(),
    level: level[config.logging],
    transports: transporters[config.logging]
});