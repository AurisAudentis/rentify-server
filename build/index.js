"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./src/app");
const config_1 = __importDefault(require("./config/config"));
new app_1.app().launch(config_1.default.port);
