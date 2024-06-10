import { create } from 'zustand'
import { persist } from 'zustand/middleware';
import axios from 'axios';
import { BASE_API_URL } from '@/shared/api';
import { DateTime } from 'luxon';
import UfiService from '../service/ufi.service.ts';
import { Ufi } from '@/entities/account/models/ufi.ts';

export type State = {
    isLoading: boolean
    isLoadingSearch: boolean
    searchedUfi: Ufi[]
    isLoadingAddUfiToMeal: boolean
}

export type Actions = {
    getAllUfiByTitle: (title: string) => void
    removeUfiFromMealDay: (ufiId: number, mealId: number) => void
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
    addUfiToMeal: (
        ufiId: number | null,
        mealId: number | null,
        userId: number | null,
        date: string | null,
        time: string | null,
        type: string | null,
    ) => void,

}

export const useUfiStore = create<State & Actions>()(
    persist(
        (set) => ({
            isLoading: false,
            isLoadingSearch: false,
            searchedUfi: [],
            isLoadingAddUfiToMeal: false,
            addUfiToMeal: async (
                ufiId: number | null,
                mealId: number | null,
                userId: number | null,
                date: string | null,
                time: string | null,
                type: string | null) => {
                    set({ isLoadingAddUfiToMeal: true })
                    try {
                        const response = await UfiService.addUfiToMeal(ufiId, mealId, userId, date, time, type)
                        return response
                    } catch (e) {
                        console.log(e)
                    } finally {
                        set({ isLoadingAddUfiToMeal: false })
                    }
                },
            getAllUfiByTitle: async (title: string) => {
                set({ isLoadingSearch: true })
                try {
                    const response = await UfiService.getAllUfiByTitle(title)
                    console.log(response.data)
                    set({ searchedUfi: response.data })
                    return response
                } catch (e) {
                    console.log('Ошибка получения UFI')
                } finally {
                    set({ isLoadingSearch: false })
                }
            },
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