import passport = require("passport");
import { IIssue, ModelIssue } from "../Database/Models/Issue";
import { ModelGroup, MGroup } from "../Database/Models/Group";
import { getById, promiselog } from "../Infrastructure/Misc/PromiseHelper";
import { handleError } from "../Infrastructure/Misc/ErrorHandler";
import {default as multer} from "multer";
import { modelMessage, messageRelationSchema } from "../Database/Models/Message";

const upload = multer({dest: process.cwd() + `/pictures`});
console.log(process.cwd() + `/pictures`)

const express = require('express');
export const issueRouter = express.Router();

issueRouter.use(passport.authenticate("bearer", {session: false}))


issueRouter.get("/:gid", (req, res) => {
    return getById(ModelGroup(), req.params.gid)
        .then((group: MGroup) => group.getIssues())
        .then(group => group.getMaintainers())
        .then(group => group.getJoinedUsers()
                    .then(users => {
                        if(!users.some(id => id.id == req.user.id) && !group.maintainers.some(id => id.id == req.user.id)) {
                            throw {status: 401, message: "You are not authorized to view these issues"};
                        }
                    })
                    .then(()=>group)
            )
        .then((group) => {
            const byId = {}
            group.issues.forEach(issue => byId[issue.id] = issue)
            res.json(byId);
        })
        .catch(err => handleError(res, err))
})

issueRouter.post("/group/:gid", (req, res) => {
    const issue:IIssue = {
        description: req.body.description,
        issue_title: req.body.issue_title,
        isPrivate: req.body.isPrivate,
        fotos: [],
        state: 0,
        created_at: new Date(),
        author: req.user
    }

    return getById(ModelGroup(), req.params.gid)
        .then(group => group.getMaintainers())
        .then(group => group.getJoinedUsers()
            .then(users => !users.some(id => id.id == req.user.id) && !group.maintainers.some(id => id.id == req.user.id))
            .then(bool => {if(bool) {throw {status: 401, message: "You are not allowed to post issues here."}}})
            .then(() => group)
            )
        .then(group => ModelIssue().create(issue)
                    .then(issue => group.addIssue(issue)
                    .then(() => res.json(issue))))

        .catch(err => handleError(res, err))
})


issueRouter.post("/:id/pictures", upload.single("file"), (req, res) => {
    getById(ModelIssue(), req.params.id)
        .then(issue => {
            issue.fotos.push(req.file.filename);
            return issue.save();
        })
        .then(issue => res.json(issue))
        .catch(err => handleError(res, err))
})

issueRouter.get("/:id/pictures/:pid", (req, res) => {
    res.sendFile("./pictures/" + req.params.pid, {root: process.cwd()});
})

issueRouter.post("/:id/messages", (req, res) => {
    const message: any = {
        sentAt: new Date(),
        text: req.body.text,
        author: [req.user]
    }

    modelMessage()
    .create(message)
    .then(message => getById(ModelIssue(), req.params.id)
    .then(promiselog)
    .then(issue => {issue.messages.push(message); issue.save()}))
    .then(issue => res.json(issue))
    .catch(err => handleError(res, err))
})

issueRouter.get("/:id/messages", (req, res) => {
    getById(ModelIssue(), req.params.id)
        .then(issue => issue.getMessages())
        .then(issue => res.json(issue.messages.map(mess => ({...mess.toJSON(), author: mess.author[0]}))))
        .catch(err => handleError(res, err))
})

issueRouter.patch("/:id", (req, res) => {
    getById(ModelIssue(), req.params.id)
    .then(iss => {
        iss.state = req.body.state;
        return iss.save()
    })
    .then(iss => res.json(iss))
    .catch(err => handleError(res, err))
})