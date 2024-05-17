import {createSlice} from '@reduxjs/toolkit';
import {RootState} from '../../app/store.ts';
import {deleteOccasion, getOccasion, occasionCreate} from "./occasionThunk.ts";
import {Occasion} from "../../types/occasion.types";
import {ValidationError} from "../../types/user.types";

interface OccasionState {
    occasions: Occasion | null;
    isLoadingOccasion: boolean;
    isErrorLoadingOccasion: ValidationError | null;
    occasion: Occasion [];
    isLoadOccasion: boolean;
    isErrorLoadOccasion: boolean;
    isDelete: boolean,
}

const initialState: OccasionState = {
    occasions: null,
    isLoadingOccasion: false,
    isErrorLoadingOccasion: null,
    occasion: [],
    isLoadOccasion: false,
    isErrorLoadOccasion: false,
    isDelete: false,
};

export const occasionSlice = createSlice({
    name: 'occasion',
    initialState,
    reducers: {},

    extraReducers: (builder) => {
        builder.addCase(occasionCreate.pending, (state) => {
            state.isLoadingOccasion = true;
            state.isErrorLoadingOccasion = null;
        });
        builder.addCase(occasionCreate.fulfilled, (state, {payload: data}) => {
            state.isLoadingOccasion = false;
            state.occasions = data;
        });
        builder.addCase(occasionCreate.rejected, (state, {payload: error}) => {
            state.isLoadingOccasion = false;
            state.isErrorLoadingOccasion = error || null;
        });

        builder.addCase(getOccasion.pending, (state) => {
            state.isLoadOccasion = true;
            state.isErrorLoadOccasion = false;
        });
        builder.addCase(getOccasion.fulfilled, (state, {payload: occasion}) => {
            state.isLoadOccasion = false;
            state.occasion = occasion;
        });
        builder.addCase(getOccasion.rejected, (state) => {
            state.isLoadOccasion = false;
            state.isErrorLoadOccasion = true;
        });

        builder.addCase(deleteOccasion.pending, (state) => {
            state.isDelete = true;
        })
        builder.addCase(deleteOccasion.fulfilled, (state) => {
            state.isDelete = false;
        })
        builder.addCase(deleteOccasion.rejected, (state) => {
            state.isDelete = false;
        });
    }
});

export const occasionReducer = occasionSlice.reducer;
export const selectOccasion = (state: RootState) => state.occasion.occasion;
export const isLoadingOccasion = (state: RootState) => state.occasion.isLoadOccasion;
export const isErrorToLoadOccasion = (state: RootState) => state.occasion.isErrorLoadOccasion;
export const isDeleteOccasion = (state: RootState) => state.occasion.isDelete;
export const isErrorLoadingOccasions = (state: RootState) => state.occasion.isErrorLoadingOccasion;