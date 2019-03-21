import { RelationSchema, Models, DeleteKind, RelationKind } from "../../Infrastructure/MongoHelper";
import { roomRelationSchema, MRoom } from "./Room";


export interface IUser {
    full_name: String,
    oid: String,
    email: String,
    created_at: Date,
    phonenum: String,
    rooms?: MRoom;

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
    name: "User",
    relations: [
        {subject: "Room", fieldlocal: "rooms", fieldother: "users", kind: RelationKind.Many, delete: DeleteKind.Relation}
    ]
}

export const ModelUser = () => Models["User"];