import type {
    BaseQueryFn
} from '@reduxjs/toolkit/query/react';
import axios, { AxiosRequestConfig } from 'axios';
import { BASE_URL, ERROR_STATUS } from "./constants/request";
import { showAlert } from './utils';

interface AxiosBaseQueryArgs {
    url: string;
    method: AxiosRequestConfig['method'];
    data?: AxiosRequestConfig['data'];
    params?: AxiosRequestConfig['params'];
}

// Define a base query type that will use Axios for fetching
export const axiosBaseQuery = (): BaseQueryFn<AxiosBaseQueryArgs, unknown, unknown> => async ({ url, method, data, params }) => {
    try {
        // Perform the request using Axios
        const result = await axios({ url: BASE_URL + url, method, data, params });
        return { data: result.data };
    } catch (axiosError: any) {
        // Extract error info from Axios's error object
        if (axios.isAxiosError(axiosError)) {
            // let err = axiosError as AxiosError;
            const statusCode = axiosError.response?.status;
            if (statusCode === axios.HttpStatusCode.Forbidden) {
                showAlert("Permission denied.", "warning");
            } else if (statusCode && ERROR_STATUS.hasOwnProperty(statusCode)) {
                showAlert(ERROR_STATUS[statusCode], "danger");
            } else if (statusCode === 400) {
                showAlert(axiosError.response?.data.detail, "danger");
            } else {
                showAlert(axiosError.response?.data.detail, "danger");
            }
        } else {
            showAlert("Send request failed", "danger");
        }

        return {
            error: {
                status: axiosError.response?.status,
                data: axiosError.response?.data || axiosError.message,
            },
        };
    }
};