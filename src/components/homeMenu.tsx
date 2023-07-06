'use client'
import { Button } from "@mui/material"
import Link from "next/link"
import DemoLogin from "./demoLogin"
export default function HomeMenu() {
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="border-2 border-rose-500 p-4">
                <Button className="bg-rose-700 text-white mx-2 my-2">
                    <Link href="/dashboard">Dashboard</Link>
                </Button>
                <Button className="bg-rose-700 text-white mx-2 my-2">
                    <Link href="/login">Log In</Link>
                </Button>
                <Button className="bg-rose-700 text-white mx-2 my-2">
                    <Link href="/register">Register</Link>
                </Button>
                <DemoLogin/>
                <Button className="bg-rose-700 text-white mx-2 my-2">
                    <Link href="/nextAuth/about">Next Auth About</Link>
                </Button>
            </div>
        </div>
    )
}