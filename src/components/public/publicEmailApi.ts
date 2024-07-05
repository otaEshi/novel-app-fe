import { createAsyncThunk } from "@reduxjs/toolkit";
import { sendRequest } from "../../utils";


export const publicChannelRequest = createAsyncThunk<any, { search: string; }>(
    "/api/public-channel",
    async (payload, thunkApi) => {
        const res = await sendRequest(`/admin/approval${payload.search}`, {
            method: 'GET',
            thunkApi
        });
        return res;

    }
);