import {createSlice} from '@reduxjs/toolkit';
import {RootState} from '../../app/store.ts';
import {
    deleteOccasion, getByOccasionByCategory,
    getOccasion, occasionCreate, updateOccasion
} from "./occasionThunk.ts";
import {Occasion} from "../../types/occasion.types";
import {ValidationError} from "../../types/user.types";

interface OccasionState {
    occasions: Occasion | null;
    isLoadingOccasion: boolean;
    isErrorLoadingOccasion: ValidationError | null;
    occasion: Occasion [];
    isLoadOccasion: boolean;
    isErrorLoadOccasion: boolean;
    isDelete: boolean;
    isUpdate: boolean;

    isLoadingGetOccasion: boolean,
    isErrorGetOccasion: boolean,
}

const initialState: OccasionState = {
    occasions: null,
    isLoadingOccasion: false,
    isErrorLoadingOccasion: null,
    occasion: [],
    isLoadOccasion: false,
    isErrorLoadOccasion: false,
    isDelete: false,
    isUpdate: false,

    isLoadingGetOccasion: false,
    isErrorGetOccasion: false,
};

export const occasionSlice = createSlice({
    name: 'occasion',
    initialState,
    reducers: {},

    extraReducers: (builder) => {
        builder.addCase(occasionCreate.pending, (state) => {
            state.isLoadingOccasion = true;
            state.isErrorLoadingOccasion = null;
        }).addCase(occasionCreate.fulfilled, (state, {payload: data}) => {
            state.isLoadingOccasion = false;
            state.occasions = data;
        }).addCase(occasionCreate.rejected, (state, {payload: error}) => {
            state.isLoadingOccasion = false;
            state.isErrorLoadingOccasion = error || null;
        });

        builder.addCase(getOccasion.pending, (state) => {
            state.isLoadOccasion = true;
            state.isErrorLoadOccasion = false;
        }).addCase(getOccasion.fulfilled, (state, {payload: occasion}) => {
            state.isLoadOccasion = false;
            state.occasion = occasion;
        }).addCase(getOccasion.rejected, (state) => {
            state.isLoadOccasion = false;
            state.isErrorLoadOccasion = true;
        });

        builder.addCase(deleteOccasion.pending, (state) => {
            state.isDelete = true;
        }).addCase(deleteOccasion.fulfilled, (state) => {
            state.isDelete = false;
        }).addCase(deleteOccasion.rejected, (state) => {
            state.isDelete = false;
        });

        builder.addCase(updateOccasion.pending, (state) => {
            state.isUpdate = true;
        }).addCase(updateOccasion.fulfilled, (state) => {
            state.isUpdate = false;
        }).addCase(updateOccasion.rejected, (state) => {
            state.isUpdate = false;
        })

        builder.addCase(getByOccasionByCategory.pending, (state) => {
            state.isLoadingGetOccasion = true;
            state.isErrorGetOccasion = false;
        });
        builder.addCase(getByOccasionByCategory.fulfilled, (state, {payload: occasion}) => {
            state.isLoadingGetOccasion = false;
            state.occasion = occasion;
        });
        builder.addCase(getByOccasionByCategory.rejected, (state) => {
            state.isLoadingGetOccasion = false;
            state.isErrorGetOccasion = true;
        });
    }
});

export const occasionReducer = occasionSlice.reducer;
export const selectOccasion = (state: RootState) => state.occasion.occasion;
export const isLoadingOccasion = (state: RootState) => state.occasion.isLoadOccasion;
export const isErrorToLoadOccasion = (state: RootState) => state.occasion.isErrorLoadOccasion;
export const isDeleteOccasion = (state: RootState) => state.occasion.isDelete;
export const isErrorLoadingOccasions = (state: RootState) => state.occasion.isErrorLoadingOccasion;
export const isUpdateOccasion = (state: RootState) => state.occasion.isUpdate;