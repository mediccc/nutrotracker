import { create } from 'zustand'
import { persist } from 'zustand/middleware';
import axios from 'axios';
import { BASE_API_URL } from '@/shared/api';
import { MealDay } from '../models/meal-day.ts';
import MealDayService from '../service/meal-day.service.ts';
import { DateTime } from 'luxon';
import { Meal } from '../models/meal.ts';

interface DefaultMeal {
    type: string
    time: string
}

interface SelectedMeal {
    id: number | null
    type: string | null
    time: string | null
    authorId: number | null
}

export type State = {
    currentMealDay: string | null
    currentMealDayData: MealDay
    isLoading: boolean
    isCalculate: boolean
    currentMealDayCcal: number
    currentMealDayProtein: number
    currentMealDayFat: number
    currentMealDayCarb: number
    selectedMeal: SelectedMeal | null
    settingsDefaultMealSchema: DefaultMeal[]
}

export type Actions = {
    createMealDay: (userId: number, isCompleted: boolean, date: string) => void
    getMealDayByDate: (date: string | null, userId: number) => void
    setCurrentMealDay: (day: string | null, userId: number) => void
    calculateMealDay: () => void
    setSelectedMeal: (meal: SelectedMeal) => void
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
            settingsDefaultMealSchema: [
                { type: 'Завтрак', time: '8:00'},
                { type: 'Обед', time: '13:00'},
                { type: 'Ужин', time: '19:00'},
            ],
            isLoading: false,
            isCalculate: false,
            currentMealDayCcal: 0,
            currentMealDayProtein: 0,
            currentMealDayFat: 0,
            currentMealDayCarb: 0,
            selectedMeal: null,
            setSelectedMeal: async (meal: SelectedMeal | null) => {
                set({
                    selectedMeal: meal
                })
                console.log('Отработало selectedMeal')
            },
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
            getMealDayByDate: async (date: string | null, userId: number | null) => {
                try {
                    const response = await MealDayService.getMealDayByDate(String(date), Number(userId))
                    console.log(response)
                    set(() => ({
                        currentMealDayData: response.data.mealDay
                    }))

                } catch (e) {
                    console.log('Ошибка получения MealDayByDate.')
                }
            },
            setCurrentMealDay: async (date: string | null, userId: number | null) => {
                set({ isLoading: true })
                try {
                    const response = await MealDayService.getMealDayByDate(String(date), Number(userId))
                    const settingsDefaultMealSchema = await useMealDayStore.getState().settingsDefaultMealSchema
                    const operatingSchema = settingsDefaultMealSchema
                    console.log('НАЧАЛО ЦИКЛА____________________________________')
                    console.log('OPEARTING SCHEMA:')
                    console.log(operatingSchema)
                    console.log('________________________________________')
                    let newSchema: DefaultMeal[] = []
                    let operateArray: DefaultMeal[] = []
                    //console.log(response.data)
                    //РАССЧЕТ ТОГО, КАКИЕ ПРИЕМЫ ПИЩИ НУЖНО ОТОБРАЗИТЬ
                    if(response.data.mealDay){
                        if(response.data.mealDay.meals.length){
                            //ЕСЛИ ЕСТЬ ПРИЕМЫ ПИЩИ
                            console.log('ЕСТЬ ПРИЕМЫ ПИЩИ')
                            await response.data.mealDay.meals.map(async (meal) => {
                                //const settingsDefaultMealSchema = await useMealDayStore.getState().settingsDefaultMealSchema
                                //console.log('settingsDefaultMealSchema:')
                                //console.log(settingsDefaultMealSchema)
                                await operatingSchema.map(async (mealDefault) => {
                                    if(mealDefault.type === meal.type){
                                        console.log('Совпадение.')
                                        //Совпадение
                                        const handleRemove = async (type: string) => {
                                            //console.log(type)
                                            //console.log(operatingSchema)
                                            newSchema = operatingSchema.filter(function(defMeal) { return defMeal.type !== type })
                                            //console.log('NEW SCHEMA IS:')
                                            //console.log(newSchema)
                                            //console.log('______________________')
                                        };

                                        //console.log('MEAL TYPE IS ' + meal.type)

                                        await handleRemove(meal.type)

                                    } 

                                    
                                })
                            })
                            console.log('ИТОГОВАЯ СХЕМА: ')
                            console.log(newSchema)
                            set({
                                settingsDefaultMealSchema: newSchema
                            })
                            
                        }
                        if(!response.data.mealDay.meals.length){
                            console.log('НЕТ ПРИЕМОВ ПИЩИ? ')
                            const newSchema = [
                                { type: 'Завтрак', time: '8:00'},
                                { type: 'Обед', time: '13:00'},
                                { type: 'Ужин', time: '19:00'},
                            ]
                            set({
                                settingsDefaultMealSchema: newSchema
                            })
                        }
                    }
                    if(!response.data.mealDay){
                        console.log('НЕТ MEAL DAY ')
                        const newSchema = [
                            { type: 'Завтрак', time: '8:00'},
                            { type: 'Обед', time: '13:00'},
                            { type: 'Ужин', time: '19:00'},
                        ]
                        set({
                            settingsDefaultMealSchema: newSchema
                        })
                    }
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