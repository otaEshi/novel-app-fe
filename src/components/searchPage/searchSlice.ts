import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ISearchNovel } from '../../types/search';
import { searchNovels } from './searchApi';
import { INovel, INovelList } from '../../types/novel';
import { novels } from '../../dataTemp';

export interface ISearchSliceState {
    novelList: INovelList;
}

const initialState: ISearchSliceState = {
    novelList: {
        novels: [
            novels[0], novels[4], novels[5], 
            novels[1], novels[3], novels[2],
        ]
    }
};

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
    },
    extraReducers: builder => {
        builder
            .addCase(searchNovels.fulfilled, (state, action) => {
                state.novelList = action.payload;
            })
    }
});

export const {  } = searchSlice.actions;

export default searchSlice.reducer;