import { createAsyncThunk } from "@reduxjs/toolkit";
import { sendRequest } from "../../utils";
import { IAddNovelToList, ICreateLibraryList, IDeleteLibraryList, ILibraryNovelList, IRemoveNovelFromList, IUpdateListPrivacy, IUpdateListTitle } from "../../types/library";

const BASE_URL = 'http://localhost:8000';

export const getLibraryLists = createAsyncThunk<ILibraryNovelList[], string>(
    "api/library/getLists",
    async (userId, thunkApi) => {
        const res = await sendRequest(`${BASE_URL}/library/list/${userId}`
            , {
                thunkApi,
                method: 'GET',
            });
        return res;
    }
); 

export const deleteNovelFromList = createAsyncThunk<any, IRemoveNovelFromList>(
    "api/library/list/removeNovel",
    async (payload, thunkApi) => {
        const res = await sendRequest(`${BASE_URL}/library/list/novel/remove`
            , {
                payload: payload,
                thunkApi,
                method: 'PATCH',
            });
        return res;
    }
); 

export const createLibraryList = createAsyncThunk<ILibraryNovelList, ICreateLibraryList>(
    "api/library/createList",
    async (payload, thunkApi) => {
        const res = await sendRequest(`${BASE_URL}/library/list`
            , {
                payload: payload,
                thunkApi,
                method: 'POST',
            });
        return res;
    }
); 

export const addNovelToList = createAsyncThunk<ILibraryNovelList, IAddNovelToList>(
    "api/library/addNovelToList",
    async (payload, thunkApi) => {
        const res = await sendRequest(`${BASE_URL}/library/list/novel/add`
            , {
                payload: payload,
                thunkApi,
                method: 'PATCH',
            });
        return res;
    }
); 

export const deleteLibraryList = createAsyncThunk<string, IDeleteLibraryList>(
    "api/library/deleteList",
    async (payload, thunkApi) => {
        const res = await sendRequest(`${BASE_URL}/library/list`
            , {
                payload: payload,
                thunkApi,
                method: 'DELETE',
            });
        return res;
    }
); 

export const updateListPrivacy = createAsyncThunk<ILibraryNovelList, IUpdateListPrivacy>(
    "api/library/updateListPrivacy",
    async (payload, thunkApi) => {
        const res = await sendRequest(`${BASE_URL}/library/list/privacy`
            , {
                payload: payload,
                thunkApi,
                method: 'PATCH',
            });
        return res;
    }
); 

export const updateListTitle = createAsyncThunk<ILibraryNovelList, IUpdateListTitle>(
    "api/library/updateListTitle",
    async (payload, thunkApi) => {
        const res = await sendRequest(`${BASE_URL}/library/list/title`
            , {
                payload: payload,
                thunkApi,
                method: 'PATCH',
            });
        return res;
    }
); 