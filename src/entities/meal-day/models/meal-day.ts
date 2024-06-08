import { Ufi } from "@/entities/account/models/ufi"
import { Meal } from "./meal"

export interface MealDay {
    id: number | null
    userId: number | null
    isCompleted: boolean | null
    date: string | null
    ufis: Ufi[] 
    meals: Meal[]
}