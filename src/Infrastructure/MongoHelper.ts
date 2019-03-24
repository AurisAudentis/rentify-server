import { Schema, Model, model } from "mongoose";
import { mapPromise, promiselog } from "./Misc/PromiseHelper";
import { capitalize } from "./Misc/StringFormatting";

export interface RelationSchema {
    name: string;
    schema: Schema;
    relations: Array<Relation>;
    receiving?: Array<Relation>;
    schemafunc?: (Schema) => any;
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
    fieldlocal: string;
    fieldother: string;
    kind: RelationKind;
    delete: DeleteKind;
}



export const Models: {[key: string]: Model<any>} = {};



export function createRelations(schemas: Array<RelationSchema>) {

    schemas = addReceiving(schemas);
    schemas = addRelationToSchemas(schemas);
    schemas.forEach(schema => schema.schema = new Schema(schema.schema));
    schemas = addPreRemoveHookToSchemas(schemas);
    schemas = executeSchemaFunctions(schemas);

    schemas = addGettersAsOwner(schemas);
    schemas = addGettersAsReceiver(schemas);
    
    schemas.forEach(schema => Models[schema.name] = model(schema.name, schema.schema))
}


function addReceiving(schemas: Array<RelationSchema>) {
    const direct = {}
    schemas.forEach(schema => direct[schema.name] = schema);
    schemas.forEach(schema => schema.receiving = []);
    schemas.forEach(schema => schema.relations.forEach(rel => 
                            direct[rel.subject].receiving.push({...rel, subject: schema.name })))
    return schemas;
}


function addRelationToSchemas(schemas: Array<RelationSchema>) {
    return schemas.map(addRelationToSchema);
}

function addRelationToSchema(schema: RelationSchema) {
    schema.relations.forEach(rel => 
        schema.schema[rel.fieldlocal] = rel.kind == RelationKind.Many ? [{type: Schema.Types.ObjectId, ref: rel.subject}]:{type: Schema.Types.ObjectId, ref: rel.subject} )
    return schema;
}

function addPreRemoveHookToSchemas(schemas: Array<RelationSchema>) {
    return schemas.map(addPreRemoveHookToSchema);
}

function addPreRemoveHookToSchema(schema: RelationSchema) {
    schema.receiving.forEach(rel => {
        schema.schema.pre("remove", function() {
            const doc = this;
            return Models[rel.subject].find({[rel.fieldlocal]: doc.id})
                .then(results => mapPromise(results, result => onDeletedRelation(rel, doc, result)))
        })
    })
    return schema;
}

function onDeletedRelation(rel: Relation, deleted, result) {

    if(rel.kind === RelationKind.Many) {
        result[rel.fieldlocal] = result[rel.fieldlocal].filter(id => id != deleted.id)
    }


    if(rel.delete === DeleteKind.Cascade) {
        if(rel.kind === RelationKind.Many && result[rel.fieldlocal].length === 0) {
            return result.remove();
        } else if(rel.kind === RelationKind.One) {
            return result.remove()
        }
    } else  if(rel.kind == RelationKind.One){
        result[rel.fieldlocal] = undefined;
    }

    return result.save();
}

function executeSchemaFunctions(schemas: Array<RelationSchema>) {
    schemas.forEach(schema => schema.schemafunc? schema.schemafunc(schema.schema):"")
    return schemas;
}

function addGettersAsOwner(schemas: Array<RelationSchema>) {
    schemas.forEach(addGetterAsOwner)
    return schemas
}

function addGetterAsOwner(schema: RelationSchema) {
    schema.relations.forEach(rel => {
        schema.schema.methods["get" + capitalize(rel.fieldlocal)] = function() {
            return this.populate(rel.fieldlocal).execPopulate();
        }
    });
}

function addGettersAsReceiver(schemas: Array<RelationSchema>) {
    schemas.forEach(addGetterAsReceiver)
    return schemas;
}

function addGetterAsReceiver(schema: RelationSchema) {
    schema.receiving.forEach(rel => {
        console.log("adding method " + "get"+capitalize(rel.fieldother) + " for schema "+ schema.name, rel.subject)
        schema.schema.methods["get" + capitalize(rel.fieldother)] = function() {
            const doc = this;
            return Models[rel.subject].find({[rel.fieldlocal]: doc.id}).exec()
                .then(origin => rel.kind == RelationKind.One ? origin[0]:origin)
                .then(origin => {doc[rel.fieldother] = origin})
                .then(() => doc)
        }
    });
}