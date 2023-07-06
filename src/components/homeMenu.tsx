'use client'
import { Button } from "@mui/material"
import Link from "next/link"
import DemoLogin from "./demoLogin"
import { useSession } from "next-auth/react"
export default function HomeMenu() {
    const {data: session} = useSession();
    let renderRegister = (session && session.user) ? false : true;
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="flex flex-row border-2 border-rose-500 p-4">
                <Button className="bg-rose-700 text-white mx-2 my-2">
                    <Link href="/dashboard">Dashboard</Link>
                </Button>
                {renderRegister && 
                <Button className="bg-rose-700 text-white mx-2 my-2">
                    <Link href="/register">Register</Link>
                </Button>
                }
                <DemoLogin/>
                <Button className="bg-rose-700 text-white mx-2 my-2">
                    <Link href="/nextAuth/about">Next Auth About</Link>
                </Button>
            </div>
        </div>
    )
}