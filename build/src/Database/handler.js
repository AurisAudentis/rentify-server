"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const Logger_1 = require("../Infrastructure/Logger");
const config_1 = __importDefault(require("../../config/config"));
exports.connectMongo = (app) => mongoose_1.connect(config_1.default.database.url, { useNewUrlParser: true })
    .then(() => Logger_1.logger.info(`Connected to mongodb at: ${config_1.default.database.url}.`))
    .catch((err) => {
    Logger_1.logger.error(`Failed to connect to mongodb at: ${config_1.default.database.url}`);
    app ? app.exit() : "";
});
