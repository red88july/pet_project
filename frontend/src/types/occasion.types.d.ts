import {UserMutation} from "./user.types";
import {CategoryMutation} from "./category.types";

export interface Occasion {
    _id: string;
    user: UserMutation;
    city: string;
    address: string;
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