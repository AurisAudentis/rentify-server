import { Models } from "../../Infrastructure/MongoHelper";


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
    name: "room",
    relations: []
}

export const ModelRoom = () => Models["room"];