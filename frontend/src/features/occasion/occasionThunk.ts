import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../utils/axiosApi.ts';
import {serverRoutes} from "../../constants/constantsServer.routes.ts";
import {Occasion, OccasionMutation} from "../../types/occasion.types";
import {RootState} from "../../app/store.ts";
import {ValidationError} from "../../types/user.types";
import {isAxiosError} from "axios";

export const occasionCreate = createAsyncThunk<Occasion, OccasionMutation, {
    rejectValue: ValidationError,
    state: RootState
}>(
    'occasion/occasionCreate',
    async (occasion, {rejectWithValue}) => {
        try {
            const formData = new FormData();
            const keys = Object.keys(occasion) as (keyof OccasionMutation)[];

            keys.forEach(key => {
                const value = occasion[key];

                if (value !== null) {
                    formData.append(key, value as string);
                }
            });

            const response = await axiosApi.post(serverRoutes.occasion, formData);
            return response.data;

        } catch (e) {
            if (isAxiosError(e) && e.response && e.response.status === 422) {
                return rejectWithValue(e.response.data);
            }
            throw e;
        }
    }
);

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
        const response = await axiosApi.delete(`${serverRoutes.occasionDelete}/${id}`,
            {headers: {'Authorization': 'Bearer ' + token}});
        return response.data;
    },
);