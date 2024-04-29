import {model, Schema} from 'mongoose';

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        autoIndex: true,
        useCreateIndex: true,
    },

    firstName: {
        type: String,
        required: true,
    },

    lastName: {
        type: String,
        required: true,
    },

    surName: String,

    email: {
        type: String,
        required: true,
        unique: true,
        autoIndex: true,
        useCreateIndex: true,
    },

    password: {
        type: String,
        required: true,
    },

    token: {
        type: String,
        unique: true,
    },

    role: {
        type: String,
        required: true,
        enum: ['speaker', 'admin'],
        default: 'guest'
    },

    avatar: String,

    phoneNumber: {
        type: String,
        required: true,
    }
});

const User = model('User', UserSchema);
export default User;