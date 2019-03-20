import { Model, Document } from "mongoose";
import { throwOnNull } from "./ErrorHandler";


export function mapPromise<E, T>(array: Array<E>, func: (E) => Promise<T>): Promise<Array<T>> {
    return Promise.all(array.map(func))
}

export function getById<T extends Document>(model: Model<T>, id) {
    return model.findById(id)
            .exec()
            .catch(err => {throw {status: 404, message: "This object was not found."}})
            .then(conference => throwOnNull(conference, "This object was not found."))
}

export function promiselog(obj) {
    console.log(obj);
    return obj;
}