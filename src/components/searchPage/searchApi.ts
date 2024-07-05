import { createAsyncThunk } from "@reduxjs/toolkit";
import { sendRequest } from "../../utils";
import { INovelList } from "../../types/novel";
import { ISearchNovel } from "../../types/search";

const BASE_URL = 'http://localhost:8000';

export const searchNovels = createAsyncThunk<INovelList, ISearchNovel>(
    "api/search",
    async (payload, thunkApi) => {
        const res = await sendRequest(`${BASE_URL}/search`
            , {
                payload: payload,
                thunkApi,
                method: 'GET',
            });
        return res;
    }
); 

