import {Schema, model} from "mongoose"


export interface IEvent {
    //Source issue
    description: String,
    date: Date,
}

export interface MEvent extends IEvent, Document {

    JSONRepr: () => any;
}

const eventSchema = new Schema({
    description: String,
    //Maintainers
    //Issues
    //events
})

export const ModelEvent = model<MEvent>("Event", eventSchema);