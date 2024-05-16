import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store.ts';
import {getOccasion} from "./occasionThunk.ts";
import {Occasion} from "../../types/occasion.types";

interface OccasionState {
    occasion: Occasion [];
    isLoadOccasion: boolean;
    isErrorLoadOccasion: boolean;
}

const initialState: OccasionState = {
    occasion: [],
    isLoadOccasion: false,
    isErrorLoadOccasion: false,
};

export const occasionSlice = createSlice({
    name: 'occasion',
    initialState,
    reducers:{},

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
    }
});

export const occasionReducer = occasionSlice.reducer;
export const selectOccasion = (state:RootState) => state.occasion.occasion;
export const isLoadingOccasion = (state: RootState) => state.occasion.isLoadOccasion;
export const isErrorToLoadOccasion = (state: RootState) => state.occasion.isErrorLoadOccasion;