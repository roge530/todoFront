'use client'
import Cookies from 'js-cookie';
import Logout from './logout';
import ButtonHome from './buttonHome';
import { useState, useEffect } from 'react';

export default function Header() {
    const [name, setName] = useState('');

    useEffect(() => {
        const cookieName = Cookies.get('name');
        setName(cookieName || '');
    }, []);
    return (
        <div>
            <h1>Welcome {name}</h1>
            <ButtonHome/>
            <Logout/>
        </div>
    )
}