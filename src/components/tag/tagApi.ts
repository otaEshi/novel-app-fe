import { createAsyncThunk } from "@reduxjs/toolkit";
import { sendRequest } from "../../utils";
import { INovelList } from "../../types/novel";

const BASE_URL = 'http://localhost:8000';

export const getNovelListByTag = createAsyncThunk<INovelList, string>(
    "api/tag/tagList",
    async (tagName: string, thunkApi) => {
        const res = await sendRequest(`${BASE_URL}/tags/${tagName}`
            , {
                thunkApi,
                method: 'GET',
            });
        return res;
    }
); 

