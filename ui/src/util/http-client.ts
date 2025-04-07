import axios from 'axios';
import { BASE_URL } from './env-helper';
import { SecurityManager } from './security-manager';

const httpClient = axios.create({
    baseURL: BASE_URL,
    timeout: 120000,
    headers: {
        "Content-Type": "application/json"
    }
});

httpClient.interceptors.request.use(
    async (config: any) => {
        const token = SecurityManager.getAuthToken();
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

httpClient.interceptors.response.use(
    (response) => {
        return response;
    },
    async function (error) {
        if (error.response.status === 403) {
            SecurityManager.logout()
        } else if (error.response.status === 401) {
            SecurityManager.logout()
        }
        return Promise.reject(error);
    }
);

export default httpClient