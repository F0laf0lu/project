import axios from "axios";
import { API_CONFIG } from "../constants/api";

const axiosClient = axios.create({
    baseURL: API_CONFIG.BASE_URL || import.meta.env.VITE_API_BASE_URL,
});


axiosClient.interceptors.request.use(
    (config) => {
        const publicRoutes = ['/Admin/Login'];
        if (publicRoutes.some(route => config.url.includes(route))) {
            console.log(true)
            return config;
        }
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


// axiosClient.interceptors.response.use(
//     (response) => {
//         return response;
//     },
//     (error) => {

//         if (error.response?.status === 401) {
//             localStorage.clear()
//             window.location.href = '/login';
//         }
//         return Promise.reject(error);
//     }
// );

export default axiosClient;