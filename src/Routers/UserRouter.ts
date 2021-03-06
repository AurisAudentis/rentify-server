import passport = require("passport");
import { ModelUser, MUser } from "../Database/Models/User";
import { handleError } from "../Infrastructure/Misc/ErrorHandler";
import { promiselog, mapPromise, getById } from "../Infrastructure/Misc/PromiseHelper";
import { MRoom } from "../Database/Models/Room";
import { MGroup } from "../Database/Models/Group";
import { ModelRequest } from "../Database/Models/Request";

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
        .then(users => {console.log(users.map(user => ({name: user.name,grp: user.groups}))); return users;})
        .then(users => users.filter(user => user.groups.length > 0))
        .then(users => res.json(users))
        .catch(err => handleError(res, err))
})

userRouter.get("/landlords/:uid/groups", (req, res) => {
    getById(ModelUser(), req.params.uid)
        .then(user => user.getGroups())
        .then(user => res.send(user.groups))
})


userRouter.get("/requests", (req, res) =>{
    const user: MUser = req.user;
    user.getGroups()
    .then(() => mapPromise(user.groups, group => group.getRooms()))
    .then(promiselog)
    .then((groups: Array<MGroup>) => groups.map(room => room.rooms).reduce((prev, curr) => prev.concat(curr), []).filter(room => !!room))
    .then(promiselog)
    .then((rooms: Array<MRoom>) => mapPromise(rooms, room => room.getRequests()))
    .then((rooms: Array<MRoom>) => rooms.map(room => room.requests))
    .then(requests => requests.reduce((prev, curr) => prev.concat(curr), []))
    .then(requests => res.json(requests))
    .catch(err => handleError(res, err))
})

userRouter.put("/requests/:id", (req, res) => {
    getById(ModelRequest(), req.params.id)
        .then(request => request.getTenant()
        .then(() => request.getRoom())
        .then(() => request.tenant[0].addRoom(request.room[0]))
        .then(() => request.delete())
        .then(() => res.json({message:"successfully sent"})))
        .catch(err => handleError(res, err))
})

userRouter.delete("/requests/:id", (req, res) => {
    getById(ModelRequest(), req.params.id)
        .then(request => request.delete())
        .then(request => res.json(request))
        .catch(err => handleError(res, err))
})

userRouter.get("/:id", (req, res) => {
    getById(ModelUser(), req.params.id)
        .then(user => res.json(user))
        .catch(err => handleError(res, err))
})