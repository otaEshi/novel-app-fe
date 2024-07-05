import { createAsyncThunk } from "@reduxjs/toolkit";
import { sendRequest } from "../../../utils";
import { INovel, IUpdateNovelInfoRequest } from "../../../types/novel";

const BASE_URL = 'http://localhost:8000';

export const getNovelDetail = createAsyncThunk<INovel, string>(
    "api/novel/detailPage",
    async (id: string, thunkApi) => {
        const res = await sendRequest(`${BASE_URL}/novel/${id}`
            , {
                thunkApi,
                method: 'GET',
            });
        return res;
    }
); 

export const updateNovelInfo = createAsyncThunk<INovel, IUpdateNovelInfoRequest>(
    "api/novel/updateNovelInfo",
    async (payload, thunkApi) => {
        const res = await sendRequest(`${BASE_URL}/user/novel`
            , {
                payload: payload,
                thunkApi,
                method: 'PATCH',
            });
        return res;
    }
);