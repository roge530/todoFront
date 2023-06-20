'use client'
import Cookies from 'js-cookie';
import Logout from './logout';
import ButtonHome from './buttonHome';
export default function Header() {
    const name = Cookies.get('name');
    return (
        <>
            <h1>Welcome {name}</h1>
            <ButtonHome/>
            <Logout/>
        </>
    )
}