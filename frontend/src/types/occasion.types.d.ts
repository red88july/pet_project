import {UserMutation} from "./user.types";
import {CategoryMutation} from "./category.types";

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
    category: CategoryMutation;
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