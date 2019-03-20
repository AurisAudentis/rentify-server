import { RelationSchema, Models, DeleteKind, RelationKind } from "../../Infrastructure/MongoHelper";


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

const userSchema = {
    full_name: String,
    email: String,
    oid: String,
    created_at: Date,
    phonenum: String,
    //Rooms
}

export const userRelationSchema: RelationSchema = {
    schema: userSchema,
    name: "user",
    relations: [{subject: "room", fieldlocal: "rooms", fieldother: "user", kind: RelationKind.Many, delete: DeleteKind.Relation}]
}

export const ModelUser = () => Models["user"];