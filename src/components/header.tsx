'use client'
import Cookies from 'js-cookie';
export default function Header() {
    const name = Cookies.get('name');
    return (
        <h1>Welcome {name}</h1>
    )
}