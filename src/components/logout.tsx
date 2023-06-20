'use client'

import React from 'react';
import { Button } from '@mui/material';
import Cookies from 'js-cookie';
import { useRouter } from "next/navigation";

const Logout: React.FC = () => {
    const router = useRouter();
    const handleLogout = () => {
        Cookies.remove('token');
        Cookies.remove('id');
        Cookies.remove('name');
        router.push("/"); 
        router.refresh();
    };
    return (
        <Button variant="contained" onClick={handleLogout}>
            Logout
        </Button>
    )
};

export default Logout;