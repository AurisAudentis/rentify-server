import passport = require("passport");
import { getIssuesAsRentee } from "../Database/Models/Issue";
import { ModelRoom } from "../Database/Models/Room";

const express = require('express');
export const issueRouter = express.Router();

issueRouter.use(passport.authenticate("bearer", {session: false}))


issueRouter.get("/", (req, res) => {
    ModelRoom().findOne({address: "some place 2"})
            .then(room => req.user.addRoom(room))
            .then(() => res.send(getIssuesAsRentee(req.user)))
            .catch(err => console.log(err))
    
})