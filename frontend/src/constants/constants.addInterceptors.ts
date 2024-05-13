import {Store} from "@reduxjs/toolkit";
import {RootState} from "../app/store.ts";
import axiosApi from "./axiosApi.ts";

export const addInterceptors = (store: Store<RootState>) => {
    const token = store.getState().users.users?.token;
    axiosApi.interceptors.request.use((config ) => {
        config.headers.set('Authorization', token ? 'Bearer ' + token : undefined);
        return config;
    });
};