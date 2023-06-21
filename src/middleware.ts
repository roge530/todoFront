import { NextRequest, NextResponse } from "next/server";
import { verifyAuth } from "./app/auth";

export default function middlewere(req:NextRequest) {
    const storedToken = req.cookies.get("token")?.value;
    const verifiedToken = storedToken && verifyAuth(storedToken);

    if (req.nextUrl.pathname.startsWith('/login') && !verifiedToken) return
    
    if (req.url.includes('/login') && verifiedToken) return NextResponse.rewrite(new URL('/dashboard', req.url))
    if (!verifiedToken) return NextResponse.rewrite(new URL('/login', req.url))
}

export const config = {
    matcher: ['/dashboard', '/logIn']
}