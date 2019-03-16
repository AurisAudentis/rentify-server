"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston = __importStar(require("winston"));
const config_1 = __importDefault(require("../../config/config"));
const transporters = {
    'dev': [new winston.transports.Console()],
    'prod': [new winston.transports.File({ filename: "server.log" })]
};
const level = {
    'dev': "debug",
    'prod': "info"
};
exports.logger = winston.createLogger({
    format: winston.format.simple(),
    level: level[config_1.default.logging],
    transports: transporters[config_1.default.logging]
});
