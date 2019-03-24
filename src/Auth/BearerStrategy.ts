import {Strategy as BearerStrategy } from "passport-http-bearer"
import {verify} from "jsonwebtoken"
import needle = require("needle");
import config from "../../config/config";
import { ModelUser } from "../Database/Models/User";
import { logger } from "../Infrastructure/Logger";

let key;
needle("get", `${config.oauth.url}/key`)
    .then(resp => key = resp.body)
    .then(() => logger.info("Key successfully fetched."))

export const bearerStrategy = new BearerStrategy(
    ((token, done) => {
        verify(token, key, (err, decoded) => {
            if (err) {done({name: "JWTExpiredErr", message: "The JWT is expired", status: 401}); return;}
            ModelUser().findOne({oid: decoded.uid})
                .exec()
                .then(user => done(null, user))
                .catch(err => {console.log(err); done(err)})
        })
    })
);


