import {types} from "node:util";

export interface OccasionTypes {
    user: string;
    title: string;
    date: string;
    time: string;
    city: string;
    address: string;
    price: number;
    description: string;
    restrictions: number;
    duration: string;
    category: string;
    image: string | null;
}

export type OccasionMutation = Omit<OccasionTypes, 'user', 'title', 'price', 'restrictions', 'duration'>;