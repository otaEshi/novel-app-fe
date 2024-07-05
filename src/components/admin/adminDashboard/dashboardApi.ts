import { createAsyncThunk } from "@reduxjs/toolkit";
import { sendRequest } from "../../../utils";
import { IUserPerTimeRequest, IViewPerGenre, IViewPerNovel, IViewPerNovelRequest, IViewPerTag, IReviewPerNovel, ICommentPerChapter, ICommentPerChapterRequest, IUserPerTime, IUserPerTimeResponse, IReviewPerNovelRequest } from "../../../types/dashboard";

const BASE_URL = 'http://localhost:8000';

// dash board data
export const getViewPerGenre = createAsyncThunk<IViewPerGenre[], void>(
    "api/dashboard/view-genre",
    async (thunkApi) => {
        const res = await sendRequest(`${BASE_URL}/dashboard/view-genre`
            , {
                thunkApi,
                method: 'GET',
            });
        return res;
    }
);

export const getViewPerTag = createAsyncThunk<IViewPerTag[], void>(
    "api/admin/view-tag",
    async (thunkApi) => {
        const res = await sendRequest(`${BASE_URL}/dashboard/view-tag`
            , {
                thunkApi,
                method: 'GET',
            });
        return res;
    }
);

export const getViewPerNovel = createAsyncThunk<IViewPerNovel[], IViewPerNovelRequest>(
    "api/admin/view-novel",
    async (payload, thunkApi) => {
        const res = await sendRequest(`${BASE_URL}/dashboard/view-novel`
            , {
                payload: payload,
                thunkApi,
                method: 'GET',
            });
        return res;
    }
);

export const getReviewsPerNovel = createAsyncThunk<IReviewPerNovel[], IReviewPerNovelRequest>(
    "api/admin/review-novel",
    async (payload, thunkApi) => {
        const res = await sendRequest(`${BASE_URL}/dashboard/review-novel`
            , {
                payload: payload,
                thunkApi,
                method: 'GET',
            });
        return res;
    }
);

export const getCommentsPerChapter = createAsyncThunk<ICommentPerChapter[], ICommentPerChapterRequest>(
    "api/admin/comment-chapter",
    async (payload, thunkApi) => {
        const res = await sendRequest(`${BASE_URL}/dashboard/comment-chapter`
            , {
                payload: payload,
                thunkApi,
                method: 'GET',
            });
        return res;
    }
);

export const getUserPerTime = createAsyncThunk<IUserPerTimeResponse, IUserPerTimeRequest>(
    "api/admin/user-time",
    async (payload, thunkApi) => {
        const res = await sendRequest(`${BASE_URL}/dashboard/user-time`
            , {
                payload: payload,
                thunkApi,
                method: 'GET',
            });
        return res;
    }
);