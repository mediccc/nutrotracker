import { create } from 'zustand'
import { persist } from 'zustand/middleware';
import axios from 'axios';
import { BASE_API_URL } from '@/shared/api';
import { DateTime } from 'luxon';
import UfiService from '../service/ufi.service.ts';

export type State = {
    isLoading: boolean
}

export type Actions = {
    removeUfiFromMealDay: (ufiId: number, mealId: number) => void,
    createUfi: (
        authorId: number,
        type: number,
        isFree: boolean,
        title: string,
        mealId: number | null,
        date: string,
        time: string,
        mealType: string,
        weight: number,
        ccal: number,
        protein: number,
        fat: number,
        carb: number
    ) => void,

}

export const useUfiStore = create<State & Actions>()(
    persist(
        (set) => ({
            isLoading: false,
            removeUfiFromMealDay: async (ufiId: number, mealId: number) => {
                const response = await UfiService.removeUfiFromMealDay(ufiId, mealId)
                //console.log(response)
                return response
            },
            createUfi: async (
                authorId: number, 
                type: number, 
                isFree: boolean, 
                title: string, 
                mealId: number | null, 
                date: string,
                time: string,
                mealType: string,
                weight: number,
                ccal: number,
                protein: number,
                fat: number,
                carb: number
            ) => {
                set({ isLoading: true })
                try {
                    const response = await UfiService.createUfi(
                        authorId, 
                        type, 
                        isFree, 
                        title, 
                        mealId, 
                        date, 
                        time, 
                        mealType,
                        weight,
                        ccal,
                        protein,
                        fat,
                        carb
                    )
                    return response

                } catch (e) {
                    console.log('Ошибка создания ЕПП.')
                } finally {
                    set({ isLoading: false })
                }
                
            }
        }),
        { name: 'ufi-store', skipHydration: true }
    )
)