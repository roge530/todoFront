'use client'

import { Button, TextField } from "@mui/material"
import Link from 'next/link'
import { useState } from "react";
import { useRouter } from "next/navigation";
import Login from "@/lib/users/read";
import { LoginForm } from "@/interfaces/users";
import ErrorModal from "./errorModal";

export default function MyLogin() {
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
        if (result.success) {
            router.push("/dashboard");
            router.refresh();
        }
        else setErrorMessage(result.errorMessage || 'Unknown error occurred');
    };

    const afterCloseModal = () => {
        setErrorMessage('');
    }

    return (
        <>         
            <form onSubmit={handleSubmit}>
                <div className="p-4">
                    <TextField
                        required
                        label="Email"
                        name="email"
                        variant="filled"
                        color="warning"
                        value={formData.email}
                        onChange={handleChange}
                        className="bg-rose-800 text-white mx-2 my-2"
                    />
                </div>
                <div className="p-4">
                    <TextField
                        required
                        label="Password"
                        name="password"
                        type="password"
                        variant="filled"
                        color="warning"
                        value={formData.password}
                        onChange={handleChange}
                        className="bg-rose-800 text-white mx-2 my-2"
                    />
                </div>
                <div className="flex justify-between p-4">
                    <Button  className="bg-rose-700 text-white mx-2 my-2">
                        <Link href="/register">Register</Link>
                    </Button>
                    <Button 
                        type="submit"
                        className="bg-rose-700 text-white mx-2 my-2"
                    >
                        Log In
                    </Button>
                </div>
            </form>
            {errorMessage && <ErrorModal message={errorMessage} afterClose={afterCloseModal}/>}
        </>
    )
}