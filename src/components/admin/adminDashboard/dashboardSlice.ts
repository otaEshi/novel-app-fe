import { createSlice } from '@reduxjs/toolkit';
import { ICommentPerChapter, IReviewPerNovel, IUserPerTimeResponse, IViewPerGenre, IViewPerNovel, IViewPerTag } from '../../../types/dashboard';
import { getCommentsPerChapter, getReviewsPerNovel, getUserPerTime, getViewPerGenre, getViewPerNovel, getViewPerTag } from './dashboardApi';

interface DashboardState {
    viewPerGenre: IViewPerGenre[];
    viewPerTag: IViewPerTag[];
    viewPerNovel: IViewPerNovel[];
    reviewsPerNovel: IReviewPerNovel[];
    commentsPerChapter: ICommentPerChapter[];
    userPerTime: IUserPerTimeResponse;
}

const initialState: DashboardState = {
    viewPerGenre: [
        { genre: 'Fantasy', viewCount: 1500 },
        { genre: 'Science Fiction', viewCount: 1200 },
        { genre: 'Romance', viewCount: 900 }
    ],
    viewPerTag: [
        { tag: 'Adventure', viewCount: 800 },
        { tag: 'Mystery', viewCount: 600 },
        { tag: 'Drama', viewCount: 700 }
    ],
    viewPerNovel: [
        { novelId: 'novel-001', novelName: 'Epic Journey', viewCount: 5000 },
        { novelId: 'novel-002', novelName: 'Galactic Wars', viewCount: 3000 },
        { novelId: 'novel-003', novelName: 'Love and Lies', viewCount: 2000 }
    ],
    reviewsPerNovel: [
        { novelId: 'novel-001', novelName: 'novel 1', reviewCount: 50 },
        { novelId: 'novel-002', novelName: 'novel 2', reviewCount: 30 },
        { novelId: 'novel-003', novelName: 'novel 3', reviewCount: 20 }
    ],
    commentsPerChapter: [
        { chapterTitle: 'chapter-001', commentCount: 15 },
        { chapterTitle: 'chapter-002', commentCount: 10 },
        { chapterTitle: 'chapter-003', commentCount: 5 }
    ],
    userPerTime: {
        userPerTime: {
            userCount: []
        },
        isNewAccount: false
    }
};

const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(getViewPerGenre.fulfilled, (state, action) => {
                state.viewPerGenre = action.payload;
            })
            .addCase(getViewPerTag.fulfilled, (state, action) => {
                state.viewPerTag = action.payload;
            })
            .addCase(getViewPerNovel.fulfilled, (state, action) => {
                state.viewPerNovel = action.payload;
            })
            .addCase(getReviewsPerNovel.fulfilled, (state, action) => {
                state.reviewsPerNovel = action.payload;
            })
            .addCase(getCommentsPerChapter.fulfilled, (state, action) => {
                state.commentsPerChapter = action.payload;
            })
            .addCase(getUserPerTime.fulfilled, (state, action) => {
                state.userPerTime = action.payload;
            })
    }
});

export const { } = dashboardSlice.actions;

export default dashboardSlice.reducer;