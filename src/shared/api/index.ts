import axios from 'axios';
import { config } from 'process';
import { AuthResponse } from '@/entities/account/models/auth-response';

const BASE_DEV_URL = 'http://localhost:7000'
const BASE_PROD_URL = 'https://neurite-backend.onrender.com'
export const BASE_API_URL = BASE_DEV_URL

const $api = axios.create({
    withCredentials: true,
    baseURL: BASE_API_URL
})

$api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`

    return config
})

$api.interceptors.response.use((config) => {
    return config
}, async (error) => {
    const originalRequest = error.config
    console.log(error)
    if(error.response.status = 401){
        try {
            const response = await axios.get<AuthResponse>(`${BASE_API_URL}/auth/refresh`, { withCredentials: true })
            localStorage.setItem('token', response.data.accessToken)
            return $api.request(originalRequest)
        } catch (e) {
            console.log('Не авторизован.')

        }
        
    }
})

export default $api