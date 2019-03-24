import { Models, RelationKind, DeleteKind } from "../../Infrastructure/MongoHelper";


export interface IRoom {
    address: String,
    //Groups

}

export interface MRoom extends IRoom, Document {

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