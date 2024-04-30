import {HydratedDocument, model, ObjectId, Schema, Types} from 'mongoose';
import User from "./User";


const EventSchema = new Schema({
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
    title: {
        type: String,
        required: true,
    },

    date: {
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

    category: String,

    image: String,
}, {versionKey: false});

const Event = model('Event', EventSchema);
export default Event;