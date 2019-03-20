import {Schema, model} from "mongoose"
import { RelationSchema, DeleteKind, RelationKind, Models } from "../../Infrastructure/MongoHelper";
import { MIssue } from "./Issue";
import { MUser } from "./User";
import { MEvent } from "./Event";


export interface IGroup {
    maintainers: Array<MUser>
    issues: Array<MIssue>
    events: Array<MEvent>
    description: String

}

export interface MGroup extends IGroup, Document {

    JSONRepr: () => any;
}

export const groupSchema = {
    description: String,
    //Maintainers
    //Issues
    //events
}

export const groupRelationSchema: RelationSchema = {
    name: "Group",
    schema: groupSchema,
    relations: [
        {subject: "User", fieldlocal:"maintainers", fieldother: "groups", kind: RelationKind.Many, delete: DeleteKind.Relation},
        {subject: "Issue", fieldlocal:"issues", fieldother: "groups", kind: RelationKind.Many, delete: DeleteKind.Relation},
        {subject: "Event", fieldlocal:"events", fieldother: "groups", kind: RelationKind.Many, delete: DeleteKind.Relation}
    ]
}

export const ModelGroup = () => Models["Group"]