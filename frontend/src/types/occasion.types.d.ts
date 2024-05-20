import {UserMutation} from "./user.types";

export interface Occasion {
    _id: string;
    user: UserMutation;
    city: string;
    address: string;
    location: string;
    title: string;
    date: string;
    time: string;
    price: number;
    description: string;
    restrictions: number;
    duration: string;
    category: string;
    image: null | string;
}

export interface OccasionMutation {
    user: string | undefined;
    city: string;
    address: string;
    location: string;
    title: string;
    date: string;
    time: string;
    price: string;
    description: string;
    restrictions: string,
    duration: string,
    category: string,
    image: File | null,
}

export interface UpdateOccasionData {
    id?: string;
    occasionMutation?: EditRequestOccasion;
}

export interface EditRequestOccasion {
    address?: string;
    city?: string;
    date?: string
    time?: string;
    description?: string;
    category?: string;
    location?: string;
}

export interface UpdateStateOccasion {
    address?: string;
    city?: string;
    date?: string
    time?: string;
    description?: string;
    category?: string;
    location?: string;
}