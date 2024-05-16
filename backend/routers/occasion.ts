import {Router} from 'express';
import mongoose from "mongoose";
import {imageUpload} from "../multer";
import Occasion from "../models/Occasion";
import {OccasionMutation, OccasionTypes} from "../types/occasion.types";
import findUser from "../middleware/findUser";
import permit from "../middleware/permit";
import auth, {RequestUser} from "../middleware/auth";

export const occasionRouter = Router();

occasionRouter.post('/', imageUpload.single('image'), async (req, res, next) => {
    try {
        let data = req.body;

        if (data.price.length > 5) {
            return res.status(422).send({message: 'Цена превышает максимальное число символов'});
        }

        const occasionData: OccasionTypes = {
            user: req.body.user,
            city: req.body.city,
            address: req.body.address,
            title: req.body.title,
            date: req.body.date,
            time: req.body.time,
            price: req.body.price,
            description: req.body.description,
            restrictions: req.body.restrictions,
            duration: req.body.duration,
            category: req.body.category,
            image: req.file ? req.file.filename : null,
        }

        const newOccasion = new Occasion(occasionData);
        await newOccasion.save();
        return res.send({message: 'Новое событие добавлено!', occasion: newOccasion})

    } catch (e) {
        if (e instanceof mongoose.Error.ValidationError) {
            return res.status(422).send(e);
        }
        next(e);
    }
});

occasionRouter.get('/', findUser, async (req: RequestUser, res, next) => {
    try {
        let queryOccasionData = req.query as object;
        const getOccasion = await Occasion.find(queryOccasionData);
        return res.send({message: 'Список всех мероприятий', occasion: getOccasion});
    } catch (e) {
        next(e);
    }
});

occasionRouter.get('/:id', async (req, res, next) => {
    try {
        const getByIdOccasion = await Occasion.findById({_id: req.params.id});

        if (!getByIdOccasion) {
            return res.status(404).send({message: 'Такого мероприятия не существует!'});
        }

        return res.send({message: `Мероприятие найдено`, occasion: getByIdOccasion});
    } catch (e) {
        next(e);
    }
});

occasionRouter.patch('/update/:id', auth, permit('speaker', 'manager', 'admin'), imageUpload.single('image'), async (req, res, next) => {
    try {
        const occasionData: OccasionMutation = {
            city: req.body.city,
            address: req.body.address,
            date: req.body.date,
            time: req.body.time,
            description: req.body.description,
            category: req.body.category,
            image: req.file ? req.file.filename : null,
        }

        const findOccasionAndUpdate = await Occasion.findByIdAndUpdate({_id: req.params.id}, occasionData, {new: true});
        return res.send({message: `Мероприятие обновлено`, occasion: findOccasionAndUpdate});
    } catch (e) {
        next(e);
    }
});

occasionRouter.delete('/delete/:id', auth, permit('manager', 'admin'), async (req, res, next) => {
    try {
        const getByIdOccasion = await Occasion.findByIdAndDelete({_id: req.params.id});

        if (!getByIdOccasion) {
            return res.status(404).send({message: 'Такого мероприятия не существует!'});
        }

        return res.send({message: `Мероприятие успешно удалено`});
    } catch (e) {
        next(e);
    }
});