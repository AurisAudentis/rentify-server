"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const express_1 = __importDefault(require("express"));
const Routers_1 = require("./Routers");
const config_1 = __importDefault(require("../config/config"));
const Logger_1 = require("./Infrastructure/Logger");
const handler_1 = require("./Database/handler");
class app {
    constructor() {
        this.app = express_1.default();
        this.setupLogging = { 'dev': this.debugLogging,
            'prod': this.prodLogging };
    }
    launch(port) {
        this.setup();
        this.routers();
        this.instance = this.app.listen(port);
        handler_1.connectMongo(this);
        Logger_1.logger.info(`Started server at port ${port}.`);
    }
    exit() {
        if (this.instance) {
            this.instance.close();
        }
    }
    setup() {
        this.setupLogging[config_1.default.logging].bind(this)();
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
        this.app.use(cookie_parser_1.default());
    }
    debugLogging() {
        this.app.use(morgan_1.default('dev'));
    }
    prodLogging() {
        this.app.use(morgan_1.default('combined', { skip: function (req, res) { return res.statusCode < 400; }, stream: { write: message => Logger_1.logger.info(message.trim()) } }));
    }
    routers() {
        this.app.use('/', Routers_1.indexRouter);
    }
}
exports.app = app;
