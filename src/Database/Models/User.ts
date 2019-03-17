import {Schema, model} from "mongoose"


export interface IUser {
    full_name: String,
    oid: String,
    email: String,
    created_at: Date,
    phonenum: String,
    //Rooms

}

export interface MUser extends IUser, Document {

    JSONRepr: () => any;
}

const userSchema: RelationSchema = new Schema({
    full_name: String,
    email: String,
    oid: String,
    created_at: Date,
    phonenum: String,
    //Rooms
})

export const ModelUser = model<MUser>("User", userSchema);