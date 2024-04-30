import {Router} from 'express';
import mongoose from "mongoose";
import {imageUpload} from "../multer";
import {UserTypes} from "../types/users.types";
import User from "../models/User";

export const usersRouter = Router();

usersRouter.post('/', imageUpload.single('avatar'), async (req, res, next) => {
    try {
        const userData: UserTypes = {
            username: req.body.username,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            surName: req.body.surName,
            email: req.body.email,
            password: req.body.password,
            avatar: req.file ? req.file.filename : null,
            phoneNumber: req.body.phoneNumber,
        };

        const newUser = new User(userData);
        newUser.generatedToken();
        await newUser.save();

        return res.send({message: 'Новый пользователь успешно создан!', user: newUser})
    } catch (e) {
        if (e instanceof mongoose.Error.ValidationError) {
            return res.status(422).send(e);
        }
        next(e);
    }
});

usersRouter.get('/', async(req, res, next) => {
   try {
       let query = req.query as object;
       console.log(query);
       const getUsers = await User.find(query);
       return res.send({message: 'Список посетителей', users: getUsers})
   } catch (e) {
       next(e)
   }
});