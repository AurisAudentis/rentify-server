const express = require('express');
export const indexRouter = express.Router();

/* GET home page. */
indexRouter.get('/', function(req, res) {
  res.json({"hello": "world"});
});

