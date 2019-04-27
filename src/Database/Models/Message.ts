import { MUser } from "./User";
import { RelationKind, DeleteKind, Models } from "../../Infrastructure/MongoHelper";

export interface IMessage {
    text: string;
    author: MUser;
    sentAt: Date;
}

export interface MMessage extends IMessage, Document {

}

const messageSchema = {
    text: String,
    sentAt: Date
}

export const messageRelationSchema = {
    name: "Message",
    schema: messageSchema,
    relations: [
        {subject: "User", fieldlocal: "author", fieldother: "message", kind: RelationKind.Many, delete: DeleteKind.Relation}
    ]
}

export const modelMessage = () => Models["Message"]