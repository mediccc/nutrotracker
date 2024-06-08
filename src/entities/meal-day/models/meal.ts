import { Ufi } from "@/entities/account/models/ufi"

export type MealType = 'Завтрак' | 'Обед' | 'Ужин' | 'Перекус'

export interface Meal {
    id: number
    time: string
    type: MealType
    authorId: number
    ufis: Ufi[]
}