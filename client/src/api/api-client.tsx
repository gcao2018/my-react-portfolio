import axios, { type AxiosInstance, type InternalAxiosRequestConfig } from 'axios';

const apiClient: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_PUBLIC_SERVER,
    headers: {
        'Content-Type': 'application/json'
    }
});

apiClient.interceptors.request.use((config: InternalAxiosRequestConfig<unknown>): InternalAxiosRequestConfig<unknown> => {
    const token = localStorage.getItem('token');
    if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default apiClient;