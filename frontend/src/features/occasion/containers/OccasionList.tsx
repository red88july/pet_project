import React from 'react';

import imageNotAvailable from '../../../assets/pic/image_not_available.png';
import {UserMutation} from "../../../types/user.types";
import {CategoryMutation} from "../../../types/category.types";
import {apiURL} from "../../../utils/constants.url.ts";

interface Props {
    id: string;
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
    image: string | null;
}

const OccasionList: React.FC<Props> = ({id, user, city, address,
      title, date, time, price, description, restrictions, duration, category, image}) => {

    let coverImage = imageNotAvailable;

    if (image) {
        coverImage = apiURL + '/' + image;
    }

    return (
        <div>

        </div>
    );
};

export default OccasionList;