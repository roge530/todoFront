'use client'

import { Button, TextField } from "@mui/material"
import Link from 'next/link'
import { useState } from "react";
import { useRouter } from "next/navigation";
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
            {errorMessage && <ErrorModal message={errorMessage} afterClose={afterCloseModal}/>}
        </>
    )
}