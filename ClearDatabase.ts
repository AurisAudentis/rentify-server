import { connectMongo } from "./src/Database/handler";
import { disconnect } from "mongoose";
import { ModelUser } from "./src/Database/Models/User";
import { ModelRoom } from "./src/Database/Models/Room";
import { ModelEvent } from "./src/Database/Models/Event";
import { ModelGroup } from "./src/Database/Models/Group";
import { ModelIssue } from "./src/Database/Models/Issue";


connectMongo(null)
    .then(() => {
        const a = ModelUser().deleteMany({});
        const b = ModelRoom().deleteMany({});
        const c = ModelGroup().deleteMany({});
        const d = ModelEvent().deleteMany({})
        const e = ModelIssue().deleteMany({})
        
        return Promise.all([a,b,c,d,e])
    })
    .then(() => disconnect())