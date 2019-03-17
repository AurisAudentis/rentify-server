import {Schema, model} from "mongoose"


export interface IGroup {
    //Maintainers
    //Issues
    //events
    description: String

}

export interface MGroup extends IGroup, Document {

    JSONRepr: () => any;
}

const groupSchema = new Schema({
    description: String,
    //Maintainers
    //Issues
    //events
})

export const ModelGroup = model<MGroup>("Group", groupSchema);