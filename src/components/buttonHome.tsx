'use client'

import React from 'react';
import { Button } from '@mui/material';
import { useRouter } from "next/navigation";

const ButtonHome: React.FC = () => {
    const router = useRouter();
    const handleClick = () => {
        router.push('/');
    };
    return (
        <Button onClick={handleClick} className="bg-rose-700 text-white mx-2 my-2">
            Home
        </Button>
    )
}

export default ButtonHome;