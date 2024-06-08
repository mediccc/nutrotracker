import { MealDay } from "@/entities/meal-day/models/meal-day"

export interface Ufi {
    id: number
    type: number
    isFree: boolean
    title: string
    code: number
    category: number
    weight: number
    ccal: number
    protein: number
    fat: number
    carb: number
    provider: string
    cost: number
    description: string
    favorite: boolean
    time: string
    mealId: number
    userId: number
    mealDay: MealDay
}
