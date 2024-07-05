import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { INovel } from '../../../types/novel';
import { getNovelDetail, updateNovelInfo } from './novelDetailPageApi';
import { novels } from '../../../dataTemp';

interface NovelDetailPageState {
    // Define the state properties here
    novel: INovel;
}

const initialState: NovelDetailPageState = {
    // Set initial values for the state properties here
    novel: novels[0],
};

const novelDetailPageSlice = createSlice({
    name: 'novelDetail',
    initialState,
    reducers: {

    },
    extraReducers: builder => {
        builder
            .addCase(getNovelDetail.fulfilled, (state, action) => {
                state.novel = action.payload;
            })
            .addCase(updateNovelInfo.fulfilled, (state, action) => {
                state.novel = action.payload;
            })
    }
});

export const { /* List your action creators here */ } = novelDetailPageSlice.actions;

export default novelDetailPageSlice.reducer;