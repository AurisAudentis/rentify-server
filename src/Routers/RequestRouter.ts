import passport = require("passport");
const express = require('express');
export const requestRouter = express.Router();

requestRouter.use(passport.authenticate("bearer", {session: false}))
