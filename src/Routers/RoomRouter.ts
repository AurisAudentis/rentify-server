import passport = require("passport");
import { getById, mapPromise } from "../Infrastructure/Misc/PromiseHelper";
import { ModelRoom } from "../Database/Models/Room";
import { handleError, throwOnIllegalSave } from "../Infrastructure/Misc/ErrorHandler";

const express = require('express');
export const roomRouter = express.Router();

roomRouter.use(passport.authenticate("bearer", {session: false}))


roomRouter.post("/:id/users", (req, res) => {
    return getById(ModelRoom(), req.params.id)
        .then(room => room.getUsers())
        .then(room => {
            if(room.users.length > 0) {
                throw {status: 400, message:"This room is already filled."}
            } else {
                req.user.rooms.push(room)
                return req.user.addRoom(room).then(() => room);
            }
        })
        .then(room => res.json({...room.toJSON(), users: room.users}))
        .catch(err => handleError(res, err))
})

roomRouter.delete("/:id/users", (req, res) => {
    return getById(ModelRoom(), req.params.id)
        .then(room => room.getGroups())
        .then(room => room.getUsers())
        .then(room => {
            const maintainers = room.groups.reduce((prev, last) => prev.concat(last.maintainers), []);

            if(!maintainers.some(id => id == req.user.id)) {
                throw {status: 401, message: "You are not a maintainer"}
            }

            return mapPromise(room.users, user => user.removeRoom(room)).then(() => room)
        })
        .catch(throwOnIllegalSave)
        .then(room => res.json({...room.toJSON(), users: room.users}))
        .catch(err => handleError(res, err))
})

roomRouter.get("/", (req, res) => {
    return req.user.getRooms()
        .then(user => mapPromise(user.rooms, room => room.getUsers()))
        .then(rooms => mapPromise(rooms, room => room.getGroups()))
        .then(rooms => res.json(rooms.map(room => ({...room, group: room.groups[0] ? room.groups[0]._id:null}))))
        .catch(err => handleError(res, err))
})

// TODO: add validation
roomRouter.post("/", (req, res) => {
    if(req.body.addresses) {
        return mapPromise(req.body.addresses, address => createRoom(address))
            .then(room => res.send(room))
            .catch(err => handleError(res, err))
    } else {
        return createRoom(req.body.address)
            .then(room => res.send(room))
            .catch(err => handleError(res, err))
    }
    
})

function createRoom(address) {
    return ModelRoom()
    .create({address: address})
}