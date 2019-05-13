import { MUser } from "./User";
import { MRoom } from "./Room";
import { RelationSchema, RelationKind, DeleteKind, Models } from "../../Infrastructure/MongoHelper";
import {Model} from "mongoose";



export interface IRequests {
    tenant: MUser;
    room: MRoom;
}



export interface MRequests extends IRequests, Document {

    JSONRepr: () => any;
}

const requestSchema = {

}

export const requestRelationSchema: RelationSchema = {
    name: "Request",
    schema: requestSchema,
    relations: [
        {subject: "User", fieldlocal: "tenant", fieldother: "requests", kind: RelationKind.Many, delete: DeleteKind.Relation},
        {subject: "Room", fieldlocal: "room", fieldother: "requests", kind: RelationKind.Many, delete: DeleteKind.Relation}
    ]
}

export const ModelRequest: Model<MRequests> = () => Models["Request"];