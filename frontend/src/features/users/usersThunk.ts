import {createAsyncThunk} from '@reduxjs/toolkit';

import {isAxiosError} from 'axios';
import axiosApi from '../../constants/axiosApi.ts';

import {
  GlobalError,
  LoginMutation,
  LoginResponse,
  RegistrationMutation,
  RegistrationResponse,
  ValidationError
} from '../../types/user.types';
import {unsetUser} from './usersSlice.ts';
import {serverRoutes} from "../../constants/constantsServer.routes.ts";

export const registration = createAsyncThunk<RegistrationResponse, RegistrationMutation, {
  rejectValue: ValidationError
}>(
  'users/registered',
  async (registration, {rejectWithValue}) => {
    try {
      const formData = new FormData();
      const keys = Object.keys(registration) as (keyof RegistrationMutation)[];

      keys.forEach(key => {
        const value = registration[key];

        if (value !== null) {
          formData.append(key, value);
        }
      });

      const response = await axiosApi.post(serverRoutes.registration, formData);
      return response.data;
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 422) {
        return rejectWithValue(e.response.data);
      }
      throw e;
    }
  }
);

export const login = createAsyncThunk<LoginResponse, LoginMutation, { rejectValue: GlobalError }>(
  'users/login',
  async (loginMutation, {rejectWithValue}) => {
    try {
      const response = await axiosApi.post(serverRoutes.login, loginMutation);
      return response.data;
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 422) {
        return rejectWithValue(e.response.data);
      }

      throw e;
    }
  }
);

export const logout = createAsyncThunk<void, undefined>(
  'users/logout',
  async (_, {dispatch}) => {
    await axiosApi.delete(serverRoutes.logout);
    dispatch(unsetUser());
  }
);