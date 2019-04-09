import passport = require("passport");
import { ModelUser } from "../Database/Models/User";
import { handleError } from "../Infrastructure/Misc/ErrorHandler";
import { promiselog, mapPromise } from "../Infrastructure/Misc/PromiseHelper";

const express = require('express');
export const userRouter = express.Router();

userRouter.use(passport.authenticate("bearer", {session: false}))

userRouter.get("/", (req, res) => {
    ModelUser().find({})
        .then(users => res.json(users))
        .catch(err => handleError(res, err))
})

userRouter.get("/landlords", (req, res) => {
    ModelUser().find({})
        .then(users => mapPromise(users, user => user.getGroups()))
        .then(promiselog)
        .then(users => users.filter(user => user.groups.length > 0))
        .then(users => res.json(users))
        .catch(err => handleError(res, err))
})