import { createAsyncThunk } from "@reduxjs/toolkit";
import { sendRequest } from "../../../utils";
import { IUser } from "../../../types/user";
import { IAdjustAdminRequest, ISearchUserRequest,  } from "../../../types/admin";
import { IAdminReportList, IAdminWarningUserRequest, IHandleReport } from "../../../types/report";

const BASE_URL = 'http://localhost:8000';

export const getAdminList = createAsyncThunk<IUser[], void>(
    "api/admin/getAdminList",
    async (thunkApi) => {
        const res = await sendRequest(`${BASE_URL}/admin/get-admin-list`
            , {
                thunkApi,
                method: 'GET',
            });
        return res;
    }
); 

export const searchUser = createAsyncThunk<IUser[], ISearchUserRequest>(
    "api/admin/searchUser",
    async (payload, thunkApi) => {
        const res = await sendRequest(`${BASE_URL}/admin/search-user`
            , {
                payload: payload,
                thunkApi,
                method: 'GET',
            });
        return res;
    }
); 

export const adjustAdminRight = createAsyncThunk<IUser, IAdjustAdminRequest>(
    "api/admin/adjustAdminRight",
    async (payload, thunkApi) => {
        const res = await sendRequest(`${BASE_URL}/admin/right`
            , {
                payload: payload,
                thunkApi,
                method: 'PATCH',
            });
        return res;
    }
); 

export const getAdminReportList = createAsyncThunk<IAdminReportList, void>(
    "api/admin/getAdminReportList",
    async (thunkApi) => {
        const res = await sendRequest(`${BASE_URL}/admin/report`
            , {
                thunkApi,
                method: 'GET',
            });
        return res;
    }
); 

export const sendWarning = createAsyncThunk<void, IAdminWarningUserRequest>(
    "api/admin/sendWarning",
    async (payload, thunkApi) => {
        const res = await sendRequest(`${BASE_URL}/admin/send-warning`
            , {
                payload: payload,
                thunkApi,
                method: 'POST',
            });
        return res;
    }
);

export const handleReportRequest = createAsyncThunk<string, IHandleReport>(
    "api/admin/handleReport",
    async (payload, thunkApi) => {
        const res = await sendRequest(`${BASE_URL}/admin/handle-report`
            , {
                payload: payload,
                thunkApi,
                method: 'PATCH',
            });
        return res;
    }
);

