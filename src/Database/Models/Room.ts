import { Models, RelationKind, DeleteKind } from "../../Infrastructure/MongoHelper";
import { MGroup } from "./Group";
import { MUser } from "./User";


export interface IRoom {
    address: String,
    groups?: Array<MGroup>
    users?: Array<MUser>
}

export interface MRoom extends IRoom, Document {
    getUsers: () => Promise<MRoom>
    JSONRepr: () => any;
}

const roomSchema = {
    address: String,
    //Groups
}

export const roomRelationSchema = {
    schema: roomSchema,
    name: "Room",
    relations: [
    ]
}

export const ModelRoom = () => Models["Room"];