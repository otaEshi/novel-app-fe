import { createAsyncThunk } from "@reduxjs/toolkit";
import { sendRequest } from "../../utils/sendRequest";
import { ILogInPayload, ILogInResponse, ISignUpPayload, ISignUpResponse, IUserInfoResponse } from "../../types/auth";

const BASE_URL = 'http://localhost:8000';

export const signUpRequest = createAsyncThunk<string, ISignUpPayload>(
    "api/sign-up",
    async (SignUpInfo, thunkApi) => {
        const res  = await sendRequest(`${BASE_URL}/auth/signup`, {
            payload: SignUpInfo,
            thunkApi,
            method: 'POST',
        });
        return res;
    }
); 

export const logInRequest = createAsyncThunk<ILogInResponse, ILogInPayload>(
  "api/login",
  async (LogInInfo, thunkApi) => {
    const res = await sendRequest(`${BASE_URL}/auth/login`, {
      payload: LogInInfo,
      thunkApi,
      method: 'POST',
      headers: { 
        'accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded' 
      },
    });
    return res;
  }
);

export const userInfoRequest = createAsyncThunk<IUserInfoResponse, void>(
  "api/userInfoRequyest",
  async (thunkApi) => {
    const res = await sendRequest(`${BASE_URL}/user/me`, {
      thunkApi,
      method: 'GET',
      headers: { 
        'accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded' 
      },
    });
    return res;
  }
);