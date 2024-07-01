import axios from "axios";

window.axios = axios;
axios.defaults.withCredentials = false;
let backendUrl = "http://" + window.location.hostname.toString() + ":8081/api";
axios.defaults.baseURL = backendUrl;

axios.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

export default axios;
