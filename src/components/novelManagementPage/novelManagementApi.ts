import { createAsyncThunk } from "@reduxjs/toolkit";
import { sendRequest } from "../../utils";
import { IChangeNovelStatusRequest, ICreateNovelChapterRequest, ICreateNovelRequest, IDeleteChapter, IDeleteNovelRequest, IGetChaptersAuthorRequest, INovel, INovelChapter, INovelList, IUpdateChapterRequest } from "../../types/novel";

const BASE_URL = 'http://localhost:8000';

export const getChaptersAuthor = createAsyncThunk<INovelChapter[], IGetChaptersAuthorRequest>(
    "api/novel/getChaptersAuthor",
    async (payload, thunkApi) => {
        const res = await sendRequest(`${BASE_URL}/novel/manage/chapters`
            , {
                payload: payload,
                thunkApi,
                method: 'GET',
            });
        return res;
    }
); 

export const getNovelListByAuthor = createAsyncThunk<INovel[], string>(
    "api/novel/getNovelListByAuthor",
    async (userId, thunkApi) => {
        const res = await sendRequest(`${BASE_URL}/user/original-works/${userId}`
            , {
                thunkApi,
                method: 'GET',
            });
        return res;
    }
); 

export const createNovel = createAsyncThunk<INovel, ICreateNovelRequest>(
    "api/novel/createNovel",
    async (payload, thunkApi) => {
        const res = await sendRequest(`${BASE_URL}/user/create-novel`
            , {
                payload: payload,
                thunkApi,
                method: 'POST',
            });
        return res;
    }
); 

export const createChapterNovel = createAsyncThunk<INovel, ICreateNovelChapterRequest>(
    "api/novel/createChapter",
    async (payload, thunkApi) => {
        const res = await sendRequest(`${BASE_URL}/user/create-chapter`
            , {
                payload: payload,
                thunkApi,
                method: 'POST',
            });
        return res;
    }
); 

export const changeChapterStatusNovel = createAsyncThunk<INovelChapter, IChangeNovelStatusRequest>(
    "api/novel/changeChapterStatus",
    async (payload, thunkApi) => {
        const res = await sendRequest(`${BASE_URL}/user/chapter-status`
            , {
                payload: payload,
                thunkApi,
                method: 'PATCH',
            });
        return res;
    }
);

export const updateChapter =  createAsyncThunk<INovelChapter, IUpdateChapterRequest>(
    "api/novel/updateChapter",
    async (payload, thunkApi) => {
        const res = await sendRequest(`${BASE_URL}/user/chapter-update`
            , {
                payload: payload,
                thunkApi,
                method: 'PATCH',
            });
        return res;
    }
);

export const permanentDeleteChapter = createAsyncThunk<INovel, IDeleteChapter>(
    "api/novel/permanentDeleteChapter",
    async (payload, thunkApi) => {
        const res = await sendRequest(`${BASE_URL}/user/chapter`
            , {
                payload: payload,
                thunkApi,
                method: 'DELETE',
            });
        return res;
    }
);

export const deleteNovel = createAsyncThunk<INovel, IDeleteNovelRequest>(
    "api/novel/deleteNovel",
    async (payload, thunkApi) => {
        const res = await sendRequest(`${BASE_URL}/novel`
            , {
                payload: payload,
                thunkApi,
                method: 'DELETE',
            });
        return res;
    }
);