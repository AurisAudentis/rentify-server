import passport = require("passport");

const express = require('express');
export const indexRouter = express.Router();

/* GET home page. */
indexRouter.get('/', passport.authenticate("bearer", {session:false}), function(req, res) {
  res.json(req.user);
});


