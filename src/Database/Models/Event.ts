import { RelationSchema, Models } from "../../Infrastructure/MongoHelper";


export interface IEvent {
    //Source issue
    description: String,
    date: Date,
}

export interface MEvent extends IEvent, Document {

    JSONRepr: () => any;
}

const eventSchema = {
    description: String,
}


export const eventRelationSchema: RelationSchema = {
    name: "Event",
    schema: eventSchema,
    relations: [
    ]
}

export const ModelEvent = () => Models["Event"];