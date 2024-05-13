import {Router} from 'express';
import mongoose, {Types} from "mongoose";
import {imageUpload} from "../multer";
import {UserTypes, UserUpdateType} from "../types/users.types";
import User from "../models/User";
import BadWordsNext from "bad-words-next";

let ru = require('bad-words-next/data/ru.json')
let en = require('bad-words-next/data/en.json')

const badWords = new BadWordsNext();
badWords.add(ru);
badWords.add(en);

export const usersRouter = Router();
usersRouter.post('/', imageUpload.single('avatar'), async (req, res, next) => {
    try {

        if (req.body.password.length >= 1 && req.body.password.length < 8) {
            return res.status(422).send({message: 'Пароль сликом короткий!'});
        }

        if (
            badWords.check(req.body.username) ||
            badWords.check(req.body.firstName) ||
            badWords.check(req.body.lastName) ||
            badWords.check(req.body.surName)
        ) {
            return res.status(422).send({ message: 'В ваших данных присутствует не нормативная лексика!' });
        }


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

usersRouter.post('/sessions', async (req, res, next) => {
    try {
        const user = await User.findOne({email: req.body.email});

        if (!user) {
            return res.status(422).send({message: `Пользователя с таким e-mail не существует!`});
        }

        const checkPass = await user.checkPassword(req.body.password);

        if (!checkPass) {
            return res.status(422).send({message: `Неверный пароль!`});
        }

        user.generatedToken();
        await user.save();

        return res.send({message: 'Email и пароль верны!', user});
    } catch (e) {
        next(e);
    }
});

usersRouter.get('/', async (req, res, next) => {
    try {
        let getQueryData = req.query as object;
        const getUsers = await User.find(getQueryData);
        return res.send({message: 'Данные успешно получены', users: getUsers})
    } catch (e) {
        next(e)
    }
});

usersRouter.get('/:id', async (req, res, next) => {
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

usersRouter.put('/update/:id', imageUpload.single('avatar'), async (req, res, next) => {
    try {
        let data = req.body;
        const updateUserData: UserUpdateType = {
            username: data.username,
            firstName: data.firstName,
            lastName: data.lastName,
            surName: req.body.surName,
            email: req.body.email,
            password: req.body.password,
            avatar: req.file ? req.file.filename : null,
            phoneNumber: req.body.phoneNumber,
            role: req.body.role,
        };

        const updateUser = await User.findByIdAndUpdate({_id: req.params.id}, updateUserData, {new: true})
        return res.send({message: 'Данные обновлены', user: updateUser});
    } catch (e) {
        next(e)
    }
});

usersRouter.delete('/delete/:id', async (req, res, next) => {
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

usersRouter.delete('/sessions', async (req, res, next) => {
    try {
        const message = {message: 'Success!'};

        const headerValue = req.get('Authorization');

        if (!headerValue) {
            return res.send(message);
        }

        const [_bearer, token] = headerValue.split(' ');

        const user = await User.findOne({token});

        if (!user) {
            return res.send(message);
        }

        user.generatedToken();
        await user.save();

        return res.send(message);
    } catch (e) {
        next(e);
    }
})