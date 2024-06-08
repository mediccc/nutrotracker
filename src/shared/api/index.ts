import axios from 'axios';


export const BASE_API_URL = 'https://neurite-backend.onrender.com'

const $api = axios.create({
    withCredentials: true,
    baseURL: BASE_API_URL
})

$api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`

    return config
})

export default $api