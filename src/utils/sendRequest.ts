
import axios, { AxiosRequestConfig, Method } from 'axios';
import { trackPromise } from 'react-promise-tracker';
import { ERROR_STATUS } from '../constants/request';
import { showAlert } from './showAlert';

interface RequestOptions {
    payload: object,
    thunkApi: any,
    method: Method;
    defineAlert?: boolean;
    headers?: any;
}

export interface IResponseRequest {
    type: string;
    payload: any;
    meta: any;
    error?: any;
}

export const sendRequest = async (url: string, options?: Partial<RequestOptions>) => {
    const method = options?.method || "GET";
    let config: AxiosRequestConfig = { method: method, url: url };
    if (options?.payload) {
        if (method.toUpperCase() === "GET") {
            config["params"] = options.payload;
        } else {
            config["data"] = options.payload;
        }
    }

    const request = axios(config)
        .then(res => {
            return res.data;
        })
        .catch(error => {
            if (!options?.defineAlert) {
                if (axios.isAxiosError(error)) {
                    const statusCode = error.response?.status;
                    if (statusCode === axios.HttpStatusCode.Forbidden) {
                        showAlert("Permission denied", "warning");
                    } else if (statusCode && ERROR_STATUS.hasOwnProperty(statusCode)) {
                        showAlert(ERROR_STATUS[statusCode], "danger");
                    } else if (statusCode === 400) {
                        showAlert(error.response?.data.detail, "danger");
                    } else {
                        showAlert(error.response?.data.detail, "danger");
                    }
                } else {
                    showAlert("Send request failed", "danger");
                }
            }
            return options?.thunkApi && options.thunkApi.rejectWithValue(error);
        });

    return trackPromise(request);
};