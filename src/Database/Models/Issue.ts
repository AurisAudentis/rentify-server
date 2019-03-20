import { MGroup } from "./Group";
import { RelationSchema, Models } from "../../Infrastructure/MongoHelper";

export interface IIssue {
    issue_title: String,
    state: Boolean,
    fotos: Array<File>,
    description: String,
    created_at: Date
    groups?: Array<MGroup>
}

export interface MIssue extends IIssue, Document {

    JSONRepr: () => any;
}

const issueSchema = {
    description: String,
    issue_title: String,
    state: Boolean,
    fotos: [{data: Buffer, contentType: String}],
    created_at: Date
}


export const issueRelationSchema: RelationSchema = {
    name: "Issue",
    schema: issueSchema,
    relations: [
    ]
}

export const ModelGroup = () => Models["Issue"];