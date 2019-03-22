import { connectMongo } from "./src/Database/handler";
import { ModelUser } from "./src/Database/Models/User";
import { ModelRoom } from "./src/Database/Models/Room";
import { disconnect } from "mongoose";


connectMongo(null)
    .then(() => ModelRoom().create({address: "some place"}))
    .then(room => 
        {

            return Promise.resolve().then(() =>
            ModelRoom().create({address: "some place 2"})
                .then(room2 => ModelUser().create({full_name:"John", oid: "5d8ad07e-fd57-4822-af9b-ffadb4e83a78", email:"some email", created_at: new Date(), phonenum: "some num", rooms: [room, room2]})
                    .then(() => room.getUsers())
                    .then(() => room.remove()))
        
    )})
    .then(() => disconnect())

