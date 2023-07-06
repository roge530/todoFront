'use client'
import Logout from './logout';
import ButtonHome from './buttonHome';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

export default function Header() {
    const [name, setName] = useState('');
    const {data: session} = useSession();
    useEffect(() => {
        setName(session?.user.name || 'no name')
    }, []);

    return (
        <div className="flex items-center justify-between">
            <h1 className="mr-auto">Welcome {name}</h1>
            <div>
                <ButtonHome />
                <Logout />
            </div>
        </div>
    )
}