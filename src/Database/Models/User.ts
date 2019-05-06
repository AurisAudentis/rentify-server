import { RelationSchema, Models, DeleteKind, RelationKind } from "../../Infrastructure/MongoHelper";
import { MRoom } from "./Room";
import { MGroup } from "./Group";


export interface IUser {
    full_name: String,
    oid: String,
    email: String,
    created_at: Date,
    phonenum: String,
    rooms?: Array<MRoom>;
    groups?: Array<MGroup>
}

export interface MUser extends IUser, Document {
    getGroups(): Promise<MUser>
    getRooms(): Promise<MUser>;
    save();
    addRoom(room: MRoom);
    JSONRepr: () => any;
    _id;
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
    ],
    schemafunc: (schema) => {
        schema.methods.addRoom = function(room) {
            const user = this as MUser;

            user.rooms.push(room);
            return user.save()
        }

        schema.methods.removeRoom = function(room){
            const user = this as MUser;
            user.rooms = user.rooms.filter(id => id != room.id)
            return user.save()
        }
    }
}

export const ModelUser = () => Models["User"];