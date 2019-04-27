import {connect} from "mongoose";
import { logger } from "../Infrastructure/Logger";
import { app } from "../app";
import config from "../../config/config";
import { createRelations, Models } from "../Infrastructure/MongoHelper";
import { userRelationSchema } from "./Models/User";
import { roomRelationSchema } from "./Models/Room";
import { eventRelationSchema } from "./Models/Event";
import { groupRelationSchema } from "./Models/Group";
import { issueRelationSchema } from "./Models/Issue";
import { messageRelationSchema } from "./Models/Message";

export const connectMongo = (app: app) => connect(config.database.url, {useNewUrlParser: true})
    .then(() => createRelations([userRelationSchema, roomRelationSchema, eventRelationSchema, groupRelationSchema, issueRelationSchema, messageRelationSchema]))
    .then(() => logger.info(`Connected to mongodb at: ${config.database.url}.`))
    .catch((err) => {
        logger.error(`Failed to connect to mongodb at: ${config.database.url}`);
        app? app.exit():"";
})

