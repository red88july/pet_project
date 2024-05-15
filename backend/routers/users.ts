import {Router} from 'express';
import mongoose, {Types} from "mongoose";
import {imageUpload} from "../multer";
import {UserTypes, UserUpdateType} from "../types/users.types";
import User from "../models/User";

export const usersRouter = Router();
usersRouter.post('/', imageUpload.single('avatar'), async (req, res, next) => {
    try {

        if (
            req.body.username === '' ||
            req.body.firstName === '' ||
            req.body.lastName === '' ||
            req.body.email === '' ||
            req.body.password === '' ||
            req.body.phoneNumber === '') {
            return res.status(422).send({message: 'Поля не могут быть пустыми!'});
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
        const updateUserData: UserUpdateType = {
            username: req.body.username,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
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