import {Schema, model} from "mongoose"

export interface IIssue {
    issue_title: String,
    state: Boolean,
    fotos: Array<File>,
    description: String,
    created_at: Date

}

export interface MIssue extends IIssue, Document {

    JSONRepr: () => any;
}

const issueSchema = new Schema({
    description: String,
    issue_title: String,
    state: Boolean,
    fotos: [{data: Buffer, contentType: String}],
    created_at: Date
})

export const ModelGroup = model<MIssue>("Issue", issueSchema);