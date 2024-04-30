import {Model} from "mongoose";
export interface UserTypes {
    username: string,
    firstName: string,
    lastName: string,
    surName: string,
    password: string,
    email: string,
    avatar: string | null,
    phoneNumber: string,
}

export interface UserDataExtendsSchema extends UserTypes {
    token: string;
    role: string;
}

interface UserMethods {
    checkPassword(password: string): Promise<Boolean>;
    generatedToken();
}

type UserModel = Model<UserDataExtendsSchema, {}, UserMethods>