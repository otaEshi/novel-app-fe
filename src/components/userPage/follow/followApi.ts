import { createAsyncThunk } from "@reduxjs/toolkit";
import { IFollowRequest, IGetFollowRequest, IUnfollowResponse, IUserCard } from "../../../types/user";
import { sendRequest } from "../../../utils";
const BASE_URL = 'http://localhost:8000';

export const getFollowers = createAsyncThunk<IUserCard[], IGetFollowRequest>(
    "api/user/getFollowers",
    async (payload, thunkApi) => {
        const res = await sendRequest(`${BASE_URL}/user/follow`
            , {
                payload: payload,
                thunkApi,
                method: 'POST',
            });
        return res;
    }
); 

export const getFollowing = createAsyncThunk<IUserCard[], IGetFollowRequest>(
    "api/user/getFollowing",
    async (payload, thunkApi) => {
        const res = await sendRequest(`${BASE_URL}/user/follow`
            , {
                payload: payload,
                thunkApi,
                method: 'POST',
            });
        return res;
    }
); 

export const followRequest = createAsyncThunk<IUserCard, IFollowRequest>(
    "api/follow/followRequest",
    async (payload, thunkApi) => {
        const res = await sendRequest(`${BASE_URL}/user/follow`
            , {
                payload: payload,
                thunkApi,
                method: 'PATCH',
            });
        return res;
    }
); 

export const unfollowRequest = createAsyncThunk<void, IFollowRequest>(
    "api/follow/unfollowRequest",
    async (payload, thunkApi) => {
        const res = await sendRequest(`${BASE_URL}/unfollow`
            , {
                payload: payload,
                thunkApi,
                method: 'PATCH',
            });
        return res;
    }
); 