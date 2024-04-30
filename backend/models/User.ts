import {HydratedDocument, model, Schema} from 'mongoose';
import {randomUUID} from "crypto";
import bcrypt from 'bcrypt';
import {UserDataExtendsSchema, UserMethods, UserModel} from "../types/users.types";

const SALT_WORK = 10;

const UserSchema = new Schema<UserDataExtendsSchema, UserMethods, UserModel>({
    username: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: async function (
                this: HydratedDocument<UserDataExtendsSchema>,
                username: string): Promise<boolean> {
                if (!this.isModified('username')) return true;

                const user: HydratedDocument<UserDataExtendsSchema> | null = await User.findOne({
                    username: username,
                });

                return !user;
            },
            message: 'Пользователь с таким именем уже существует!'
        }
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
        validate: {
            validator: async function (
                this: HydratedDocument<UserDataExtendsSchema>,
                email: string): Promise<boolean> {
                if (!this.isModified('email')) return true;

                const user: HydratedDocument<UserDataExtendsSchema> | null = await User.findOne({
                    email: email,
                });

                return !user;
            },
            message: 'Почтовый адрес уже зарегистирован!'
        }
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
        enum: ['speaker', 'guest', 'admin'],
        default: 'guest',
    },

    avatar: String,

    phoneNumber: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: async function (
                this: HydratedDocument<UserDataExtendsSchema>,
                phoneNumber: string): Promise<boolean> {
                if (!this.isModified('phoneNumber')) return true;

                const user: HydratedDocument<UserDataExtendsSchema> | null = await User.findOne({
                    phoneNumber: phoneNumber,
                });

                return !user;
            },
            message: 'Номер использутеся другим пользователем!'
        }
    }
}, {versionKey: false});


UserSchema.methods.generatedToken = function () {
    this.token = randomUUID();
}

UserSchema.methods.checkPassword = function (password: string) {
    return bcrypt.compare(password, this.password);
}

UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(SALT_WORK);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

UserSchema.set('toJSON', {
    transform: (_doc, ret, _options) => {
        delete ret.password;
        return ret;
    }
})

const User = model<UserDataExtendsSchema, UserModel>('User', UserSchema);
export default User;