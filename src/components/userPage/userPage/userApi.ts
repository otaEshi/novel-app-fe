import { createAsyncThunk } from "@reduxjs/toolkit";
import { IUpdateUserProfileRequest, IUser } from "../../../types/user";
import { sendRequest } from "../../../utils";
import { INovel } from "../../../types/novel";
import { IReview } from "../../../types/review";
import { IGetReportRequest, IReportRequest } from "../../../types/report";
const BASE_URL = 'http://localhost:8000';

export const getUser = createAsyncThunk<IUser, string>(
    "api/user/getUser",
    async (userId, thunkApi) => {
        const res = await sendRequest(`${BASE_URL}/user/${userId}`
            , {
                thunkApi,
                method: 'GET',
            });
        return res;
    }
); 

export const getOriginalWorks = createAsyncThunk<INovel[], string>(
    "api/user/originalWorks",
    async (userId, thunkApi) => {
        const res = await sendRequest(`${BASE_URL}/user/original-works/${userId}`
            , {
                thunkApi,
                method: 'GET',
            });
        return res;
    }
); 

export const getUserReviews = createAsyncThunk<IReview[], string>(
    "api/user/reviews",
    async (userId, thunkApi) => {
        const res = await sendRequest(`${BASE_URL}/user/reviews/${userId}`
            , {
                thunkApi,
                method: 'GET',
            });
        return res;
    }
); 

export const updateUserProfile = createAsyncThunk<IUser, IUpdateUserProfileRequest>(
    "api/user/updateUserProfile",
    async (payload, thunkApi) => {
        const res = await sendRequest(`${BASE_URL}/user`
            , {
                payload: payload,
                thunkApi,
                method: 'PATCH',
            });
        return res;
    }
); 

export const getReport = createAsyncThunk<any, IGetReportRequest>(
    "api/user/getReport",
    async (payload, thunkApi) => {
        const res = await sendRequest(`${BASE_URL}/user/report/report`
            , {
                payload: payload,
                thunkApi,
                method: 'GET',
            });
        return res;
    }
); 