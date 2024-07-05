import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import axios from 'axios';
import { handleAxiosReponseError, handleAxiosRequest } from './axiosConfig';
import { Provider } from 'react-redux';
import { store } from './app/store';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';

// Set backend url
axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;
// Set default request timeout
axios.defaults.timeout = 30000; // ms
// Inject id_token for authorization
axios.interceptors.request.use(
  handleAxiosRequest,
  error => Promise.reject(error)
);
// Refresh token if id token is expired
axios.interceptors.response.use(
  res => res,
  handleAxiosReponseError
);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <App />
  </Provider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
