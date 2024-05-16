import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../utils/axiosApi.ts';
import {serverRoutes} from "../../constants/constantsServer.routes.ts";
import {Occasion} from "../../types/occasion.types";

export const getOccasion = createAsyncThunk<Occasion []>(
    'occasion/getOccasion',
    async () => {
        const response = await axiosApi.get<Occasion []>(serverRoutes.occasion);
        return response.data;
    }
);