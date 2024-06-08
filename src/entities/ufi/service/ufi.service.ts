import $api from "@/shared/api";
import { AxiosResponse } from "axios";
import { UfiResponse } from "../models/ufi-response";
import { RemoveUfiResponse } from "../models/remove-ufi-response";
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

    //static async getAllUfiByMealDayId(mealDayId: number): Promise<AxiosResponse<any>> {
        //return $api.get<Ufi[]>(`/ufi/getAllUfiByMealDayId/${mealDayId}`)

    //}

}