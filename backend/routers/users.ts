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
       let getQueryData = req.query as object;
       const getUsers = await User.find(getQueryData);
       return res.send({message: 'Данные успешно получены', users: getUsers})
   } catch (e) {
       next(e)
   }
});

usersRouter.get('/:id', async(req, res, next) => {
   try {
       const findUserById = await User.findById({_id: req.params.id});
       if (!findUserById) {
           return res.status(404).send({message: 'Такого опользователя не существует'});
       }
       return res.send({message: `Пользователь найден!`, users: findUserById});
   } catch (e) {
       next(e)
   }
});

usersRouter.delete('/:id', async(req, res, next) => {
   try {
       const deleteUserById = await User.findByIdAndDelete({_id: req.params.id});
       if (!deleteUserById) {
           return res.status(404).send({message: 'Такого пользователя не существует'});
       }
       return res.send({message: 'Пользователь успешно удален'});
   } catch (e) {
       next(e);
   }
});