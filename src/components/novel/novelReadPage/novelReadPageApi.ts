import { createAsyncThunk } from "@reduxjs/toolkit";
import { sendRequest } from "../../../utils";
import { IAddCommentRequest, IComment, IDeleteCommentRequest, ILikeComment, INovelChapter } from "../../../types/novel";
import { IReportRequest } from "../../../types/report";

const BASE_URL = 'http://localhost:8000';

export const getChapter = createAsyncThunk<INovelChapter, {novel_id: string, chapter_number: string}>(
    "api/novel/getChapter",
    async ({novel_id, chapter_number}, thunkApi) => {
        const res = await sendRequest(`${BASE_URL}/novel/${novel_id}/chapter/${chapter_number}`
            , {
                thunkApi,
                method: 'GET',
            });
        return res;
    }
); 

export const getTotalChapter = createAsyncThunk<string, string>(
    "api/novel/getTotalChapters",
    async (novel_id: string, thunkApi) => {
        const res = await sendRequest(`${BASE_URL}/novel/chapters/${novel_id}`
            , {
                thunkApi,
                method: 'GET',
            });
        return res;
    }
); 

export const getChapterComment = createAsyncThunk<IComment[], {novel_id: string, chapter_number: string}>(
    "api/novel/getChapterComment",
    async ({novel_id, chapter_number}, thunkApi) => {
        const res = await sendRequest(`${BASE_URL}/novel/${novel_id}/chapter/${chapter_number}/comment`
            , {
                thunkApi,
                method: 'GET',
            });
        return res;
    }
); 

export const deleteComment = createAsyncThunk<void, IDeleteCommentRequest>(
    "api/novel/deleteComment",
    async (payload, thunkApi) => {
        const res = await sendRequest(`${BASE_URL}/admin/comment`
            , {
                payload: payload,
                thunkApi,
                method: 'DELETE',
            });
        return res;
    }
); 

export const addComment = createAsyncThunk<IComment, IAddCommentRequest>(
    "api/novel/addComment",
    async (payload, thunkApi) => {
        const res = await sendRequest(`${BASE_URL}/novel/comment`
            , {
                payload: payload,
                thunkApi,
                method: 'POST',
            });
        return res;
    }
);

export const reportComment = createAsyncThunk<void, IReportRequest>(
    "api/novel/reportComment",
    async (payload, thunkApi) => {
        const res = await sendRequest(`${BASE_URL}/novel/comment/report`
            , {
                payload: payload,
                thunkApi,
                method: 'POST',
            });
        return res;
    }
);

export const likeComment = createAsyncThunk<IComment, ILikeComment>(
    "api/novel/likeComment",
    async (payload, thunkApi) => {
        const res = await sendRequest(`${BASE_URL}/novel/comment/like`
            , {
                payload: payload,
                thunkApi,
                method: 'PATCH',
            });
        return res;
    }
);