import { create } from 'zustand'
import { persist } from 'zustand/middleware';
import axios from 'axios';
import { BASE_API_URL } from '@/shared/api';
import { MealDay } from '../models/meal-day.ts';
import MealDayService from '../service/meal-day.service.ts';
import { DateTime } from 'luxon';

export type State = {
    currentMealDay: string | null
    currentMealDayData: MealDay
    isLoading: boolean
    isCalculate: boolean
    currentMealDayCcal: number
    currentMealDayProtein: number
    currentMealDayFat: number
    currentMealDayCarb: number
}

export type Actions = {
    createMealDay: (userId: number, isCompleted: boolean, date: string) => void
    getMealDayByDate: (date: string | null) => void
    setCurrentMealDay: (day: string | null) => void
    calculateMealDay: () => void
}

export const useMealDayStore = create<State & Actions>()(
    persist(
        (set) => ({
            currentMealDay: DateTime.local().setLocale('ru').toISODate(),
            currentMealDayData: {
                id: null,
                userId: null,
                isCompleted: null,
                date: null,
                ufis: [],
                meals: []
            },
            isLoading: false,
            isCalculate: false,
            currentMealDayCcal: 0,
            currentMealDayProtein: 0,
            currentMealDayFat: 0,
            currentMealDayCarb: 0,
            calculateMealDay: async () => {
                set({ isCalculate: true})
                try {
                    let ccal = 0
                    let protein = 0
                    let fat = 0
                    let carb = 0
                    const currentMealDayData = await useMealDayStore.getState().currentMealDayData
                    currentMealDayData && currentMealDayData.meals && (currentMealDayData.meals.map((meal) => {
                        if(meal.ufis){
                            meal.ufis.map((ufi) => {
                            ccal += (ufi.ccal * (ufi.weight/100))
                            protein += (ufi.protein * (ufi.weight/100))
                            fat += (ufi.fat * (ufi.weight/100))
                            carb += (ufi.carb * (ufi.weight/100))
                            })
                        }
                        set({ currentMealDayCcal: Number(ccal.toFixed(2)) })
                        set({ currentMealDayProtein: Number(protein.toFixed(2)) })
                        set({ currentMealDayFat: Number(fat.toFixed(2)) })
                        set({ currentMealDayCarb: Number(carb.toFixed(2)) })
                    }))
                    if(!currentMealDayData || !currentMealDayData.meals.length){
                        set({ currentMealDayCcal: 0 })
                        set({ currentMealDayProtein: 0 })
                        set({ currentMealDayFat: 0 })
                        set({ currentMealDayCarb: 0 })
                    }

                    return console.log('Процесс рассчетов завершен.')
                } catch (e) {
                    console.log('Ошибка рассчетов MealDay')
                } finally {
                    set({ isCalculate: false})
                }

            },
            getMealDayByDate: async (date: string | null) => {
                try {
                    const response = await MealDayService.getMealDayByDate(String(date))
                    console.log(response)
                    set(() => ({
                        currentMealDayData: response.data.mealDay
                    }))

                } catch (e) {
                    console.log('Ошибка получения MealDayByDate.')
                }
            },
            setCurrentMealDay: async (date: string | null) => {
                set({ isLoading: true })
                try {
                    const response = await MealDayService.getMealDayByDate(String(date))
                    //console.log(response.data)
                    set(() => ({
                        currentMealDay: date,
                        currentMealDayData: response.data.mealDay
                    }))
                    return response
                } catch (e) {
                    console.log('Ошибка изменения currentMealDay.')
                } finally {
                    set({ isLoading: false })
                }
            },
            createMealDay: async (userId: number, isCompleted: boolean, date: string) => {
                try {
                    const response = await MealDayService.createMealDay(userId, isCompleted, date)
                    console.log(response)
                } catch(e) {
                    console.log('Ошибка при создании mealDay.')
                }
            },
        }),
        { name: 'meal-day-store', skipHydration: true }
    )
)