export interface User {
    _id: string;
    username: string;
    firstName: string;
    lastName: string;
    surName: string;
    phoneNumber: string;
    email: string;
    password: string;
    token: string;
    role: string;
    avatar: File | null;
}

export interface RegistrationMutation {
    username: string;
    firstName: string;
    lastName: string;
    surName: string;
    phoneNumber: string;
    email: string;
    password: string;
    avatar: File | null;
}

export interface RegistrationResponse {
    message: string;
    user: User;
}

export interface LoginResponse {
    message: string;
    user: User;
}

export interface LoginMutation {
    email: string;
    password: string;
}

export interface ValidationError {
    errors: {
        [key: string]: {
            name: string;
            message: string;
        }
    },
    message: string;
    name: string;
    _message: string;
}

export interface GlobalError {
    message: string;
}