import { createAsyncThunk } from "@reduxjs/toolkit";
import { IDeleteReview, ILikeReview, IPostReview, IReview, IUpdateReview } from "../../types/review";
import { sendRequest } from "../../utils";
import { IReportRequest } from "../../types/report";

const BASE_URL = 'http://localhost:8000';

export const getNovelReview = createAsyncThunk<IReview[], string>(
    "api/novel/review",
    async (id: string, thunkApi) => {
        const res = await sendRequest(`${BASE_URL}/novel/review/${id}`
            , {
                thunkApi,
                method: 'GET',
            });
        return res;
    }
); 

export const postReview = createAsyncThunk<IReview, IPostReview>(
    "api/novel/postReview",
    async (payload, thunkApi) => {
        const res = await sendRequest(`${BASE_URL}/novel/review`
            , {
                payload,
                thunkApi,
                method: 'POST',
            });
        return res;
    }
); 

export const deleteReview = createAsyncThunk<IReview, IDeleteReview>(
    "api/novel/deleteReview",
    async (payload, thunkApi) => {
        const res = await sendRequest(`${BASE_URL}/novel/review`
            , {
                payload,
                thunkApi,
                method: 'DELETE',
            });
        return res;
    }
); 

export const updateReview = createAsyncThunk<IReview, IUpdateReview>(
    "api/novel/updateReview",
    async (payload, thunkApi) => {
        const res = await sendRequest(`${BASE_URL}/novel/review`
            , {
                payload,
                thunkApi,
                method: 'PUT',
            });
        return res;
    }
);

export const reportReview = createAsyncThunk<IReview, IReportRequest>(
    "api/novel/reportReview",
    async (payload, thunkApi) => {
        const res = await sendRequest(`${BASE_URL}/novel/review/report`
            , {
                payload,
                thunkApi,
                method: 'POST',
            });
        return res;
    }
);

export const likeReview = createAsyncThunk<IReview, ILikeReview>(
    "api/novel/likeReview",
    async (payload, thunkApi) => {
        const res = await sendRequest(`${BASE_URL}/novel/review/like`
            , {
                payload,
                thunkApi,
                method: 'PATCH',
            });
        return res;
    }
);