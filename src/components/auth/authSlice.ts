import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { logInRequest, signUpRequest, userInfoRequest } from './authApi';
import { IUserInfoResponse } from '../../types/auth';

// Try to load user info from local storage
let access_token = localStorage.getItem('access_token');
let userId = null;
let isAuthenticated = Boolean(access_token);

if (access_token) {
    try {
        let tokenDecode: any = jwtDecode(access_token);
        if (tokenDecode) {
            userId = tokenDecode['user_id'];
        }
    } catch (error) {
        isAuthenticated = false;
        localStorage.removeItem('access_token');
        sessionStorage.removeItem('access_token');
    }
}

interface AuthState {
    currentUser: IUserInfoResponse
}


const initialState: AuthState = {
    currentUser: {
        username: 'JulieGarwood',
        id: '11',
        name: 'Julie Garwood',
        admin_type: 2,
    } as IUserInfoResponse
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {

        logout: state => {
            localStorage.setItem('isAuthenticated', JSON.stringify(false));
            localStorage.removeItem('access_token');
            localStorage.removeItem('token_type');
            localStorage.removeItem('isAuthenticated');
            localStorage.removeItem('refresh_token');
            state.currentUser = {} as IUserInfoResponse;
        },

        setAvatarURL: (state, action) => {
            state.currentUser.avatar = action.payload;
        }

    },
    extraReducers: builder => {
        builder
            .addCase(logInRequest.fulfilled, (state, action) => {
                if (action.payload) {
                    localStorage.setItem('access_token', action.payload.access_token);
                    localStorage.setItem('refresh_token', action.payload.refresh_token);
                    localStorage.setItem('token_type', action.payload.token_type);
                    localStorage.setItem('isAuthenticated', JSON.stringify(true));
                }
            })
            .addCase(userInfoRequest.fulfilled, (state, action) => {
                if (action.payload) {
                    state.currentUser = action.payload;
                }
            });
    }
});

export const { logout , setAvatarURL} = authSlice.actions;
export default authSlice.reducer;