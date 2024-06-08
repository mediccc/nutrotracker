import { create } from 'zustand'
import { User } from '../models/user'
import { Ufi } from '../models/ufi.ts'
import AuthService from '../service/auth.service';
import { persist } from 'zustand/middleware';
import axios from 'axios';
import { AuthResponse } from '../models/auth-response';
import { BASE_API_URL } from '@/shared/api';

export type State = {
    account: User
    isAuth: boolean
    errors: object[]
}

export type Actions = {
    //setAuth: (isAuth: boolean) => void
    //setUser: (user: User) => void
    login: (email: string, password: string) => void
    registration: (email: string, password: string) => void
    logout: () => void
    checkAuth: () => void
}

export const useAccountStore = create<State & Actions>()(
    persist(
        (set) => ({
            account: { email: '', id: 0, isActivated: false},
            isAuth: false,
            errors: [],
            //setAuth: () => {},
            //setUser: () => {},
            login: async (email: string, password: string) => {
                try {
                    const response = await AuthService.login(email, password)
                    console.log(response)
                    localStorage.setItem('token', response.data.accessToken)
                    set(() => ({
                        account: response.data.user,
                        isAuth: true
                    }))
                } catch(e) {
                    console.log('Ошибка логина.')
                }
            },
            getUfi: async () => {},
            registration: async (email: string, password: string) => {
                try {
                    const response = await AuthService.registration(email, password)
                    console.log(response)
                    localStorage.setItem('token', response.data.accessToken)
                    set(() => ({
                        account: response.data.user,
                        isAuth: true
                    }))
                } catch(e) {
                    console.log('Ошибка регистрации.')
                }
            },
            logout: async () => {
                try {
                    const response = await AuthService.logout()
                    localStorage.removeItem('token')
                    set(() => ({
                        account: { email: '', id: 0, isActivated: false},
                        isAuth: false
                    }))
                } catch(e) {
                    console.log('Ошибка логаута.')
                }
            },
            checkAuth: async () => {
                try {
                    const response = await axios.get<AuthResponse>(`${BASE_API_URL}/auth/refresh`, { withCredentials: true })

                    console.log(response)
                    localStorage.setItem('token', response.data.accessToken)
                    set(() => ({
                        account: response.data.user,
                        isAuth: true
                    }))
                } catch(e) {
                    console.log('Ошибка checkAuth.')
                }
            }

        }),
        { name: 'account-store', skipHydration: true }
    )
)