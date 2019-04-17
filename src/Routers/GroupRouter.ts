import passport = require("passport");
import { ModelRoom, MRoom } from "../Database/Models/Room";
import { mapPromise, getById } from "../Infrastructure/Misc/PromiseHelper";
import { ModelGroup } from "../Database/Models/Group";
import { handleError, throwOnIllegalSave } from "../Infrastructure/Misc/ErrorHandler";
import { MUser } from "../Database/Models/User";

const express = require('express');
export const groupRouter = express.Router();

groupRouter.use(passport.authenticate("bearer", {session: false}))

// TODO: validation
groupRouter.post("/", (req, res) => {
    const group = {
        description: req.body.description,
        maintainers: req.body.maintainers || [],
        rooms: []
    }

        // If the user isn't in the array yet, add him
    if(!group.maintainers.some(id => id == req.user.id)) {
        group.maintainers.push(req.user._id);
    }

    return mapPromise(req.body.rooms.map(address => {address}), (room => ModelRoom().create(room).exec()))
        .then((rooms: Array<MRoom>) => {
            group.rooms = rooms
            console.log(group.rooms);
            return ModelGroup().create(group);
        })
        .catch(throwOnIllegalSave)
        .then(group => res.json(group))
        .catch(err => handleError(res, err))
})

groupRouter.put("/:id/rooms", (req, res) => {
    return getById(ModelGroup(), req.params.id)
        .then(group =>  {
            const rooms = req.body.rooms.filter(room => !group.rooms.some(gr => gr == room)) //array contains is broken (due to types)
            group.rooms = group.rooms.concat(rooms);
            return group.save()
        })
        .then((group) => res.json(group))
        .catch(throwOnIllegalSave)
        .catch(err => handleError(res, err))
})

groupRouter.get("/", (req, res) => {
    const user: MUser = req.user;
    return user.getGroups()
        .then(user => user.getRooms())
        .then(user => mapPromise(user.rooms, room => room.getGroups()))
        .then(() => {
            const renteegroups = user.rooms.reduce((prev, curr) => prev.concat(curr.groups), [])
            res.json({
                "tenant": renteegroups,
                "landlord": user.groups
            })
        })
        .catch(err => handleError(res, err))
})

groupRouter.get("/:gid/rooms", (req, res) => {
    return getById(ModelGroup(), req.params.gid)
                .then(group => group.getRooms())
                .then(group => mapPromise(group.rooms, room => room.getUsers()).then(() => group))
                .then(group => res.json(group.rooms))
                .catch(err => handleError(res, err))
})