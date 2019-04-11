import { MGroup } from "./Group";
import { RelationSchema, Models, RelationKind, DeleteKind } from "../../Infrastructure/MongoHelper";
import { MUser } from "./User";
import { mapPromise, promiselog } from "../../Infrastructure/Misc/PromiseHelper";

export interface IIssue {
    issue_title: String,
    state: Number,
    fotos: Array<File>,
    description: String,
    created_at: Date,
    isPrivate: boolean
    groups?: Array<MGroup>,
    author: MUser
}

export interface MIssue extends IIssue, Document {

    JSONRepr: () => any;
}

const issueSchema = {
    description: String,
    issue_title: String,
    state: Number,
    isPrivate: Boolean,
    fotos: [{data: Buffer, contentType: String}],
    created_at: Date
}


export const issueRelationSchema: RelationSchema = {
    name: "Issue",
    schema: issueSchema,
    relations: [
        {subject: "User", fieldlocal: "author", fieldother: "issues", kind: RelationKind.One, delete: DeleteKind.Relation}
    ]
}


export function getIssuesAsRentee(user: MUser) {
    return user.getRooms()
    .then(user => mapPromise(user.rooms, room => room.getGroups()))
    .then(() => mapPromise(user.rooms, room => mapPromise(room.groups, group => group.getIssues())))
    .then(array => array.reduce((prev, curr) => prev.concat(curr), []))
}
export const ModelIssue = () => Models["Issue"];