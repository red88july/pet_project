import axios from 'axios';
import { apiURL } from './constants.ts';
import {Store} from "@reduxjs/toolkit";
import {RootState} from "./app/store.ts";

const axiosApi = axios.create({
  baseURL: apiURL,
});

export const addInterceptors = (store: Store<RootState>) => {
  const token = store.getState().users.users?.token;
  axiosApi.interceptors.request.use((config ) => {
    config.headers.set('Authorization', token ? 'Bearer ' + token : undefined);
    return config;
  });
};

export default axiosApi;