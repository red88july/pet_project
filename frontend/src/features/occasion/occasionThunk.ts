import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../utils/axiosApi.ts';
import {serverRoutes} from "../../constants/constantsServer.routes.ts";
import {Occasion} from "../../types/occasion.types";
import {RootState} from "../../app/store.ts";

export const getOccasion = createAsyncThunk<Occasion []>(
    'occasion/getOccasion',
    async () => {
        const response = await axiosApi.get<Occasion []>(serverRoutes.occasion);
        return response.data;
    }
);


export const deleteOccasion = createAsyncThunk<void, string, { state: RootState }>(
    'occasion/deleteOccasion',
    async (id, {getState}) => {
        const token = getState().users.users?.token;
        const response = await axiosApi.delete(`${serverRoutes.occasionDelete}/${id}`, {headers: {'Authorization': 'Bearer ' + token}});
        return response.data;
    },
);