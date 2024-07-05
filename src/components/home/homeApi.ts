import { createAsyncThunk } from "@reduxjs/toolkit";
import { sendRequest } from "../../utils";
import { INovel } from "../../types/novel";

const BASE_URL = 'http://localhost:8000';

export const getTagList = createAsyncThunk<string[], void>(
    "api/tag/tagList",
    async (thunkApi) => {
        const res = await sendRequest(`${BASE_URL}/tags/tag-list`
            , {
                thunkApi,
                method: 'GET',
            });
        return res;
    }
); 

export const getGenreList = createAsyncThunk<string[], void>(
    "api/genre/genreList",
    async (thunkApi) => {
        const res = await sendRequest(`${BASE_URL}/genre/genre-list`
            , {
                thunkApi,
                method: 'GET',
            });
        return res;
    }
); 

export const getTopViewNovelList = createAsyncThunk<INovel[], void>(
    "api/novel/topViewList",
    async (thunkApi) => {
        const res = await sendRequest(`${BASE_URL}/novel/top-view`
            , {
                thunkApi,
                method: 'GET',
            });
        return res;
    }
); 

export const getTopRatingNovelList = createAsyncThunk<INovel[], void>(
    "api/novel/topRatingList",
    async (thunkApi) => {
        const res = await sendRequest(`${BASE_URL}/novel/top-rating`
            , {
                thunkApi,
                method: 'GET',
            });
        return res;
    }
); 

export const getRecentlyUpdateList = createAsyncThunk<INovel[], void>(
    "api/novel/recentlyUpdateList",
    async (thunkApi) => {
        const res = await sendRequest(`${BASE_URL}/novel/recently-update`
            , {
                thunkApi,
                method: 'GET',
            });
        return res;
    }
); 

export const getYouMayLikeList = createAsyncThunk<INovel[], void>(
    "api/novel/youMayLikeList",
    async (thunkApi) => {
        const res = await sendRequest(`${BASE_URL}/novel/you-may-like`
            , {
                thunkApi,
                method: 'GET',
            });
        return res;
    }
); 
