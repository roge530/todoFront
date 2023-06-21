import axios, { AxiosResponse } from "axios";
import { LoginForm } from "@/interfaces/users";
import Cookies from "js-cookie";
import { LoginResult } from "@/interfaces/users";

export default async function Login(data: LoginForm): Promise<LoginResult> {
    try {
        if (!process.env.API_URL || !process.env.API_PORT) {
            throw new Error('API_URL or API_PORT is not defined');
        }
        const response: AxiosResponse = await axios.post(
            `https://${process.env.API_URL}/users/logIn`,
            data
        );

        if (response.status === 200) {
            const token = response.data["token"];
            const id = response.data["id"];
            const name = response.data["name"];
            Cookies.set("token", token, { expires: 7, sameSite: 'Strict' });
            Cookies.set("id", id, { expires: 7, sameSite: 'Strict' });
            Cookies.set("name", name, {expires: 7, sameSite: 'Strict'});
            return { success: true };
        }
    } catch (error: any) {
        return { success: false, errorMessage: error.message };
    }
    return { success: false };
}