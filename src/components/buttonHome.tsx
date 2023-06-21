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
        <Button variant='contained' onClick={handleClick}  className="bg-gray-700 text-white">
            Home
        </Button>
    )
}

export default ButtonHome;