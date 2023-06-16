'use client'
import { Button, TextField } from "@mui/material"
import Link from 'next/link'
import axios, { AxiosResponse } from "axios"
import { useState } from "react";
import { useRouter } from "next/navigation";
import Home from "@/components/home";

interface FormData {
    name: string;
    email: string;
    password: string;
}

export default function Register() {
    const router = useRouter();
    const [formData, setFormData] = useState<FormData>({
        name: "",
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
              'http://localhost:3002/users/signUp',
              formData
            );
      
            if (response.status === 201) router.push("/logIn");
        } catch (error: any) {
            console.error(error);
        }
    }

    return (
        <section className="flex items-center justify-center h-screen">
            <div className="flex justify-between bg-slate-200 flex-col rounded-md items-center justify-center">
                <div className="p-4">
                    <h1>Create a new account</h1>
                    <Home/>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="p-4">
                        <TextField
                            required
                            label="Name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </div>
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
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="p-4">
                        <Button
                            type="submit"
                            variant="outlined"
                            color="primary"
                            sx={{ backgroundColor: '#000' }}
                        >
                            Create account
                        </Button>
                        <Button variant="outlined" color="primary" sx={{backgroundColor: '#000'}}>
                            <Link href="/logIn">Already have an account?</Link>
                        </Button>
                    </div>
                </form>
            </div>
        </section>
    )
}