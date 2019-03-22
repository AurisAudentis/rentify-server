import { MGroup } from "./Group";
import { RelationSchema, Models } from "../../Infrastructure/MongoHelper";
import { MUser } from "./User";
import { mapPromise, promiselog } from "../../Infrastructure/Misc/PromiseHelper";

export interface IIssue {
    issue_title: String,
    state: Boolean,
    fotos: Array<File>,
    description: String,
    created_at: Date
    groups?: Array<MGroup>
}

export interface MIssue extends IIssue, Document {

    JSONRepr: () => any;
}

const issueSchema = {
    description: String,
    issue_title: String,
    state: Boolean,
    fotos: [{data: Buffer, contentType: String}],
    created_at: Date
}


export const issueRelationSchema: RelationSchema = {
    name: "Issue",
    schema: issueSchema,
    relations: [
    ]
}

export function getIssues(user: MUser) {

}

export function getIssuesAsRentee(user: MUser) {
    return user.getRooms()
    .then(promiselog)
    .then(user => mapPromise(user.rooms, room => room.getGroups()))
    .then(() => mapPromise(user.rooms, room => mapPromise(room.groups, group => group.getIssues())))
    .then(() => console.log(user))
}

export const ModelIssue = () => Models["Issue"];