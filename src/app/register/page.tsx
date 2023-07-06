'use client'
import { Button, TextField } from "@mui/material"
import Link from 'next/link'
import { useState } from "react";
import { useRouter } from "next/navigation";
import ButtonHome from "@/components/buttonHome";
import { RegisterForm } from "@/interfaces/users";
import RegisterUser from "@/lib/users/create";
import ErrorModal from "@/components/errorModal";

export default function Register() {
    const router = useRouter();
    const [errorMessage, setErrorMessage] = useState('');
    const [formData, setFormData] = useState<RegisterForm>({
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

        let result = await RegisterUser(formData);
        if (result.success) router.push("/");
        else setErrorMessage(result.errorMessage || 'Unknown error occurred');
    }

    const afterCloseModal = () => {
        setErrorMessage('');
    }

    return (
        <section className="flex items-center justify-center h-screen">
            <div className="border-2 border-rose-500 p-4">
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-row items-center justify-evenly px-4 py-2">
                            <TextField
                                required
                                label="Name"
                                name="name"
                                variant="filled"
                                color="warning"
                                value={formData.name}
                                onChange={handleChange}
                                className="bg-rose-800 text-white mx-2 my-2"
                            />

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

                            <TextField
                                required
                                label="Password"
                                type="password"
                                name="password"
                                variant="filled"
                                color="warning"
                                value={formData.password}
                                onChange={handleChange}
                                className="bg-rose-800 text-white mx-2 my-2"
                            />
                    </div>
                    <div className="flex justify-between px-4 py-2">
                        <ButtonHome/>
                        <Button
                            type="submit"
                            className="bg-rose-700 text-white mx-2 my-2"
                        >
                            Create account
                        </Button>
                    </div>
                </form>
            </div>
            {errorMessage && <ErrorModal message={errorMessage} afterClose={afterCloseModal}/>}
        </section>
    )
}