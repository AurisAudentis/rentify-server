import { IUser, ModelUser } from "../Database/Models/User";
import { handleError } from "../Infrastructure/Misc/ErrorHandler";

const express = require('express');
export const authRouter = express.Router();


// TODO: validation
authRouter.put("/register", (req, res) => {
    const user: IUser = {
        full_name: req.body.fullname || req.body.full_name,
        oid: req.body.oid,          // We should really validate this...
        email: req.body.email || req.body.mail,
        created_at: new Date(),
        phonenum: req.body.phonenumber || req.body.phonenum || req.body.phone_number
    }

    return ModelUser().create(user)
        .then(() => res.json(user))
        .catch(err => handleError(res, err))
})