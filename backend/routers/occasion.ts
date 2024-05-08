import {Router} from 'express';
import mongoose from "mongoose";
import {imageUpload} from "../multer";
import Occasion from "../models/Occasion";

export const occasionRouter = Router();

occasionRouter.post('/', imageUpload.single('image'), async (req, res, next) => {
    try {
        let data = req.body;

        if (data.price.length > 5) {
            return res.status(422).send({message: 'Цена превышает максимальное число символов'});
        }

        const occasionData = {
            user: data.user,
            city: data.city,
            address: data.address,
            title: data.title,
            date: data.date,
            time: data.time,
            price: data.price,
            description: data.description,
            restrictions: data.restrictions,
            duration: data.duration,
            category: data.category,
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

occasionRouter.get('/', async (req, res, next) => {

});