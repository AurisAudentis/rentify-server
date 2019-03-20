import { connectMongo } from "./src/Database/handler";
import { disconnect } from "mongoose";
import { ModelUser } from "./src/Database/Models/User";
import { ModelRoom } from "./src/Database/Models/Room";


connectMongo(null)
    .then(() => {
        const a = ModelUser().deleteMany({});
        const b = ModelRoom().deleteMany({});

        return Promise.all([a,b])
    })
    .then(() => disconnect())