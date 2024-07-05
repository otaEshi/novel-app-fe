import { createSlice } from "@reduxjs/toolkit";
import { getGenreList, getRecentlyUpdateList, getTagList, getTopRatingNovelList, getTopViewNovelList, getYouMayLikeList } from "./homeApi";
import { INovel } from "../../types/novel";
import { genres, tags } from "../../dataTemp";
import { novels } from "../../dataTemp";

interface HomeState {
    tagList: string[];
    genreList: string[];
    topViewList: INovel[];
    topRatingList: INovel[];
    recentUpdateList: INovel[];
    youMayLikeList: INovel[];
}

const initialState: HomeState = {
    tagList: tags,
    genreList: genres,
    topViewList: [
       novels[0], novels[1], novels[2]
    ],
    topRatingList: [
        novels[3], novels[4], novels[5]
    ],
    recentUpdateList: [
        novels[5], novels[1], novels[3]
    ],
    youMayLikeList: [
        novels[0], novels[2], novels[3], novels[4], novels[5], novels[1], novels[3], novels[1]
    ],
};

const homeSlice = createSlice({
    name: 'home',
    initialState,
    reducers: {

    },
    extraReducers: builder => {
        // builder
        //     .addCase(getTagList.fulfilled, (state, action) => {
        //         state.tagList = action.payload;
        //     })
        //     .addCase(getGenreList.fulfilled, (state, action) => {
        //         state.genreList = action.payload;
        //     })
        //     .addCase(getTopViewNovelList.fulfilled, (state, action) => {
        //         state.topViewList = action.payload;
        //     })
        //     .addCase(getTopRatingNovelList.fulfilled, (state, action) => {
        //         state.topRatingList = action.payload;
        //     })
        //     .addCase(getRecentlyUpdateList.fulfilled, (state, action) => {
        //         state.recentUpdateList = action.payload;
        //     })
        //     .addCase(getYouMayLikeList.fulfilled, (state, action) => {
        //         state.youMayLikeList = action.payload;
        //     })
    }
});

export default homeSlice.reducer;