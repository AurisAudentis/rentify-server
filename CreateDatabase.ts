import { connectMongo } from "./src/Database/handler";
import { ModelUser } from "./src/Database/Models/User";
import { ModelRoom } from "./src/Database/Models/Room";
import { disconnect } from "mongoose";
import { promiselog } from "./src/Infrastructure/Misc/PromiseHelper";


connectMongo(null)
    .then(() => ModelRoom().create({address: "some place"}))
    .then(room => 
        {

            return Promise.resolve().then(() =>
            ModelRoom().create({address: "some place 2"})
                .then(room2 => ModelUser().create({full_name:"John", oid: "id", email:"some email", created_at: new Date(), phonenum: "some num", rooms: [room, room2]})
                    .then(() => room.getUser())
                    .then(() => room.remove())
                    .then(() => room2.remove()))
        
    )})
    .then(() => disconnect())

