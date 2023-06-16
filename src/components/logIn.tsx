'use client'

import { Button, TextField } from "@mui/material"
import axios, { AxiosResponse } from "axios";
import Link from 'next/link'
import { useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import Home from "./home";

interface FormData {
    email: string;
    password: string;
}

export default function MyLogIn() {
    const router = useRouter();
    const [formData, setFormData] = useState<FormData>({
        email: "",
        password: "",
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            const response: AxiosResponse = await axios.post(
                'http://localhost:3002/users/logIn',
                formData
            );

            if (response.status === 200) {
                const token = response.data["token"];
                const id = response.data["id"];
                const name = response.data["name"];
                Cookies.set("token", token, { expires: 7, sameSite: 'Strict' });
                Cookies.set("id", id, { expires: 7, sameSite: 'Strict' });
                Cookies.set("name", name, {expires: 7, sameSite: 'Strict'});
                router.push("/dashboard"); 
            }
        } catch (error: any) {
            console.error(error);
        }
    };

    return (
        <section className="flex items-center justify-center h-screen">
            <div className="flex justify-between bg-slate-200 flex-col rounded-md items-center justify-center">
                <div className="p-4">
                    <h1>Welcome</h1>
                    <Home/>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="p-4">
                        <TextField
                            required
                            label="Email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="p-4">
                        <TextField
                            required
                            label="Password"
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="p-4">
                        <Button 
                            type="submit"
                            variant="outlined"
                            color="primary"
                            sx={{backgroundColor: '#000'}}
                        >
                            Log In
                        </Button>
                        <Button  variant="outlined" color="primary" sx={{backgroundColor: '#000'}}>
                            <Link href="/register">Register</Link>
                        </Button>
                    </div>
                </form>
            </div>
        </section>
    )
}