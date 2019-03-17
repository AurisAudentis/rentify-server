import { Schema } from "mongoose";

export interface RelationSchema {
    name: string;
    schema: object;
    relations: Array<Relation>;
    receiving?: Array<Relation>;
}

export enum RelationKind {
    Many,
    One
}

export enum  DeleteKind {
    Cascade,
    Relation
}

interface Relation {
    subject: string;
    field: string;
    kind: RelationKind;
    delete: DeleteKind;
}

function createRelations(schemas: Array<RelationSchema>) {
    schemas = addReceiving(schemas);
    
}


function addReceiving(schemas: Array<RelationSchema>) {
    const direct = {}
    schemas.forEach(schema => direct[schema.name] = schema);
    schemas.forEach(schema => schema.receiving = []);
    schemas.forEach(schema => schema.relations.forEach(rel => 
                            direct[rel.subject].receiving.push(rel)))
    return schemas;
}


function addRelationToSchemas(schemas: Array<RelationSchema>) {
    return schemas.map(addRelationToSchema);
}

function addRelationToSchema(schema: RelationSchema) {
    schema.relations.forEach(rel => 
        schema.schema[rel.field] = rel.kind == RelationKind.Many ? [{type: Schema.Types.ObjectId, ref: rel.subject}]:{type: Schema.Types.ObjectId, ref: rel.subject} )
}
