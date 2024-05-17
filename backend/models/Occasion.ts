import {HydratedDocument, model, Schema, Types} from 'mongoose';
import User from "./User";
import {UserDataExtendsSchema} from "../types/users.types";

const OccasionSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User',
        validate: {
            validator: async (value: Types.ObjectId) => {
                const userNew = await User.findById(value);
                return Boolean(userNew);
            },
            message: 'Такой пользователь не обнаружен!',
        }
    },

    city: {
        type: String,
        required: true,
    },

    address: {
        type: String,
        required: true,
    },

    location: {
        type: String,
        required: true,
    },

    title: {
        type: String,
        required: true,
    },

    date: {
        type: String,
        required: true,
    },

    time: {
        type: String,
        required: true,
    },

    price: {
        type: Number,
        required: true,
    },

    description: String,

    restrictions: Number,

    duration: String,

    category: {
        type: String,
        required: true,
    },

    image: String,
}, {versionKey: false});

const Occasion = model('Occasion', OccasionSchema);
export default Occasion;