import passport = require("passport");
import { getIssuesAsRentee } from "../Database/Models/Issue";

const express = require('express');
export const issueRouter = express.Router();

issueRouter.use(passport.authenticate("bearer", {session: false}))


issueRouter.get("/", (req, res) => {
    res.send(getIssuesAsRentee(req.user))
})