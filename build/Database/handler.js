"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const process_1 = require("process");
const Logger_1 = require("../src/Infrastructure/Logger");
exports.connectMongo = (app) => mongoose_1.connect(process_1.config.database.url, { useNewUrlParser: true })
    .then(() => Logger_1.logger.info(`Connected to mongodb at: ${process_1.config.database.url}.`))
    .catch((err) => {
    Logger_1.logger.error(`Failed to connect to mongodb at: ${process_1.config.database.url}`);
    app ? app.exit() : "";
});
