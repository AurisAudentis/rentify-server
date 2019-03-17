import {Schema, model} from "mongoose"


export interface IRoom {
    address: String,
    //Groups

}

export interface MRoom extends IRoom, Document {

    JSONRepr: () => any;
}

const roomSchema = new Schema({
    address: String,
    //Groups
})

export const ModelRoom = model<MRoom>("Room", roomSchema);