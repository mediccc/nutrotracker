import $api from "@/shared/api";
import { AxiosResponse } from "axios";
import { MealDayResponse } from "../models/meal-day-response";
import { MealDay } from "../models/meal-day";
export default class MealDayService {
    
    static async createMealDay(
        userId: number,
        isCompleted: boolean,
        date: string
    ): Promise<AxiosResponse<MealDayResponse>> {
        return $api.post<MealDayResponse>('/meal-days/createMealDay', 
        { 
            userId, 
            isCompleted,
            date,
        })
    }

    static async getMealDayByDate(date: string, userId: number): Promise<AxiosResponse<MealDayResponse>> {
        return $api.post<MealDayResponse>(`/meal-days/getMealDayByDate`, 
        {
            date,
            userId
        })
    }
}