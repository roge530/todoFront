import { RegisterForm } from "@/interfaces/users";
import CommonResult from "@/interfaces/commonResult";
import axios, { AxiosResponse } from "axios"

export default async function RegisterUser(data: RegisterForm): Promise<CommonResult> {
    try {
        if (!process.env.API_URL || !process.env.API_PORT) {
            throw new Error('API_URL or API_PORT is not defined');
        } 
        const response: AxiosResponse = await axios.post(
            `https://${process.env.API_URL}/users/signUp`,
            data
        );
        return {success: true}
    } catch (error: any) {
        return {success: false, errorMessage: error.message}
    }
}