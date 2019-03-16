import {connect} from "mongoose";
import { logger } from "../Infrastructure/Logger";
import { app } from "../app";
import config from "../../config/config";

export const connectMongo = (app: app) => connect(config.database.url, {useNewUrlParser: true})
    .then(() => logger.info(`Connected to mongodb at: ${config.database.url}.`))
    .catch((err) => {
        logger.error(`Failed to connect to mongodb at: ${config.database.url}`);
        app? app.exit():"";
})

