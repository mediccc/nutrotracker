import $api from "@/shared/api";
import { AxiosResponse } from "axios";
import { User } from "../models/user";

export default class UserService {
    static async getAllUsers(): Promise<AxiosResponse<User[]>> {
        return $api.get<User[]>('/users')
    }
}