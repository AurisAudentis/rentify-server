"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
exports.indexRouter = express.Router();
/* GET home page. */
exports.indexRouter.get('/', function (req, res) {
    res.json({ "hello": "world" });
});
