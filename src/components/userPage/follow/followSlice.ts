import { createSlice } from '@reduxjs/toolkit';
import { followRequest, getFollowers, getFollowing, unfollowRequest } from './followApi';
import { IUserCard } from '../../../types/user';

interface FollowState {
    followers: IUserCard[];
    following: IUserCard[];
}

const initialState: FollowState = {
    followers: [],
    following: [],
};

const followSlice = createSlice({
    name: 'follow',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(getFollowers.fulfilled, (state, action) => {
                state.followers = action.payload;
            })
            .addCase(getFollowing.fulfilled, (state, action) => {
                state.following = action.payload;
            })
            .addCase(followRequest.fulfilled, (state, action) => {
                state.following.push(action.payload);
            })
            .addCase(unfollowRequest.fulfilled, (state, action) => {
                state.following = state.following.filter(userCard => userCard.id !== action.meta.arg.followId);
            })
    }
});

export const { } = followSlice.actions;

export default followSlice.reducer;