'use client'

import { Button, TextField } from "@mui/material"
import Link from 'next/link'
import { useState } from "react";
import { useRouter } from "next/navigation";
import Home from "./home";
import Login from "@/lib/users/create";
import { LoginForm } from "@/interfaces/users";
import ErrorModal from "./errorModal";

export default function MyLogIn() {
    const router = useRouter();
    const [errorMessage, setErrorMessage] = useState('');
    const [formData, setFormData] = useState<LoginForm>({
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
        let result = await Login(formData);
        if (result.success) router.push("/dashboard");
        else setErrorMessage(result.errorMessage || 'Unknown error occurred');
    };

    const afterCloseModal = () => {
        setErrorMessage('');
    }

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
            {errorMessage && <ErrorModal message={errorMessage} afterClose={afterCloseModal}/>}
        </section>
    )
}