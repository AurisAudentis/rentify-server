import { RelationSchema, DeleteKind, RelationKind, Models } from "../../Infrastructure/MongoHelper";
import { MIssue } from "./Issue";
import { MUser } from "./User";
import { MEvent } from "./Event";
import { mapPromise } from "../../Infrastructure/Misc/PromiseHelper";
import { MRoom } from "./Room";


export interface IGroup {
    maintainers: Array<MUser>
    issues: Array<MIssue>
    events: Array<MEvent>
    description: String
    rooms?: Array<MRoom>
}

export interface MGroup extends IGroup, Document {
    save: any;
    getRooms: () => Promise<MGroup>
    getIssues: () => Promise<MGroup>
    JSONRepr: () => any;
    getJoinedUsers: () => Promise<Array<MUser>>
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
        {subject: "Event", fieldlocal:"events", fieldother: "groups", kind: RelationKind.Many, delete: DeleteKind.Relation},
        {subject: "Room", fieldlocal:"rooms", fieldother: "groups", kind: RelationKind.Many, delete: DeleteKind.Relation},
    ],
    schemafunc: (schema) => {
        schema.methods.getJoinedUsers = function(): Promise<Array<MUser>> {
            const group: MGroup = this;
            return group.getRooms()
                    .then((group: MGroup) => mapPromise(group.rooms, room => room.getUsers()))
                    .then(() => group.rooms.reduce((prev, curr) => prev.concat(curr.users), []))
        }

        schema.methods.addIssue = function(issue) {
            const group: MGroup = this;
            group.issues.push(issue)
            return group.save()
        }
    }
}

export const ModelGroup = () => Models["Group"]