import {createSlice} from '@reduxjs/toolkit';
import {RootState} from '../../app/store.ts';
import {deleteOccasion, getOccasion} from "./occasionThunk.ts";
import {Occasion} from "../../types/occasion.types";

interface OccasionState {
    occasion: Occasion [];
    isLoadOccasion: boolean;
    isErrorLoadOccasion: boolean;
    isDelete: boolean,
}

const initialState: OccasionState = {
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