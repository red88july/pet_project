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

// export const albumCreate = createAsyncThunk<AlbumsMutation, AlbumsData, {
//     rejectValue: ValidationError,
//     state: RootState
// }>(
//     'albums/albumCreate',
//     async (album, {rejectWithValue, getState}) => {
//
//         try {
//             const token = getState().users.usersLog?.token;
//
//             const formData = new FormData();
//             const keys = Object.keys(album) as (keyof AlbumsData)[];
//
//             keys.forEach(key => {
//                 const value = album[key];
//
//                 if (value !== null) {
//                     if (typeof value === 'number') {
//                         formData.append(key, value.toString());
//                     } else {
//                         formData.append(key, value);
//                     }
//                 }
//             });
//
//             const response = await axiosApi.post('/albums', formData, {headers: {'Authorization': 'Bearer ' + token}});
//             return response.data;
//
//         } catch (e) {
//             if (isAxiosError(e) && e.response && e.response.status === 422) {
//                 return rejectWithValue(e.response.data);
//             }
//
//             throw e;
//         }
//     }
// );

// export const getAlbums = createAsyncThunk<Albums [], string>(
//     'albums/fetch',
//     async (id: string) => {
//         const response = await axiosApi.get<Albums []>('/albums?artist=' + id);
//         return response.data;
//     }
// );



// export const deleteAlbum = createAsyncThunk<void, string, { state: RootState }>(
//     'albums/deleteAlbum',
//     async (id, {getState}) => {
//         const token = getState().users.usersLog?.token;
//         const response = await axiosApi.delete('/albums/' + id, {headers: {'Authorization': 'Bearer ' + token}});
//         return response.data;
//     }
// );
//
// export const updateAlbum = createAsyncThunk<UpdateAlbum, string, { state: RootState }>(
//     'albums/updateAlbum',
//     async (id, {getState}) => {
//         const token = getState().users.usersLog?.token;
//         const response = await axiosApi.patch(`/albums/` + id + '/togglePublished', null, {headers: {'Authorization': 'Bearer ' + token}});
//         return response.data;
//     }
// );