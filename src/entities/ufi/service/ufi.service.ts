import $api from "@/shared/api";
import { AxiosResponse } from "axios";
import { UfiResponse } from "../models/ufi-response";
import { RemoveUfiResponse } from "../models/remove-ufi-response";
import { Ufi } from "@/entities/account/models/ufi";
export default class UfiService {
    
    static async createUfi(
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
    ): Promise<AxiosResponse<UfiResponse>> {
        return $api.post<UfiResponse>('/ufi/createUfi', { 
            authorId, 
            type, 
            title, 
            isFree, 
            mealId, 
            date, 
            time, 
            mealType,
            weight,
            ccal,
            protein,
            fat,
            carb
        })
    }

    static async removeUfiFromMealDay(
        ufiId: number,
        mealId: number
    ): Promise<AxiosResponse<RemoveUfiResponse>> {
        return $api.post<RemoveUfiResponse>('/ufi/removeUfiFromMeal', 
        { 
            ufiId,
            mealId
        })
    }

    static async getAllUfiByTitle(title: string): Promise<AxiosResponse<any>> {
        return $api.get<Ufi[]>(`/ufi/search/${title}`)
    }

    static async addUfiToMeal(
        ufiId: number | null,
        mealId: number | null ,
        userId: number | null,
        date: string | null,
        time: string | null,
        type: string | null,
    ): Promise<AxiosResponse<UfiResponse>> {
        return $api.post<UfiResponse>('/ufi/addUfiToMeal', { 
            ufiId,
            mealId,
            userId,
            date,
            time,
            type
        })
    }

}