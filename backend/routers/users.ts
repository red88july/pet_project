import {Router} from 'express';
import mongoose from "mongoose";
import {imageUpload} from "../multer";
import {UserTypes} from "../types/users.types";

export const usersRouter = Router();

usersRouter.post('/', imageUpload.single('avatar'), async (req, res) => {
    try {
        const {data} = req.body;
        const userData: UserTypes = {
            username: data.username,
            firstName: data.firstName,
            lastName: data.lastName,
            surName: data.surName,
            email: data.email,
            password: data.password,
            avatar: req.file ? req.file.filename : null,
            phoneNumber: data.phoneNumber,
        };



    } catch (e) {
        if (e instanceof mongoose.Error.ValidationError) {
            return res.status(422).send(e);
        }
    }
});
