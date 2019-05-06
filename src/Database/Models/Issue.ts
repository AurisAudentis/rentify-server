import { MGroup } from "./Group";
import { RelationSchema, Models, RelationKind, DeleteKind } from "../../Infrastructure/MongoHelper";
import { MUser } from "./User";
import { mapPromise, promiselog } from "../../Infrastructure/Misc/PromiseHelper";

export interface IIssue {
    issue_title: String,
    state: Number,
    fotos: Array<string>,
    description: String,
    created_at: Date,
    isPrivate: boolean
    groups?: Array<MGroup>,
    author: MUser
}

export interface MIssue extends IIssue, Document {
    getMessages: () => any;
    JSONRepr: () => any;
}

const issueSchema = {
    description: String,
    issue_title: String,
    state: Number,
    isPrivate: Boolean,
    fotos: [String],
    created_at: Date
}


export const issueRelationSchema: RelationSchema = {
    name: "Issue",
    schema: issueSchema,
    relations: [
        {subject: "User", fieldlocal: "author", fieldother: "issues", kind: RelationKind.One, delete: DeleteKind.Relation},
        {subject: "Message", fieldlocal: "messages", fieldother: "issue", kind: RelationKind.Many, delete: DeleteKind.Relation}
    ],
    schemafunc: (schema) => {
        schema.methods.getMessagesCorrect = function(user: MUser) {
            const issue = this as MIssue;

            return issue.getMessages()
                .then(issue => issue.messages = issue.messages.map(mess => ({...mess.toJSON(), author: mess.author[0], you: mess.author[0]._id.equals(user._id)})))
                .then(promiselog)
                
        }
    }

}


export function getIssuesAsRentee(user: MUser) {
    return user.getRooms()
    .then(user => mapPromise(user.rooms, room => room.getGroups()))
    .then(() => mapPromise(user.rooms, room => mapPromise(room.groups, group => group.getIssues())))
    .then(array => array.reduce((prev, curr) => prev.concat(curr), []))
}
export const ModelIssue = () => Models["Issue"];