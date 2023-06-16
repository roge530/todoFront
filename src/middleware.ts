import { NextRequest, NextResponse } from "next/server";
import { verifyAuth } from "./app/auth";

export default function middlewere(req:NextRequest) {
    const storedToken = req.cookies.get("token")?.value;
    const verifiedToken = storedToken && verifyAuth(storedToken);

    if (req.nextUrl.pathname.startsWith('/logIn') && !verifiedToken) return
    
    if (req.url.includes('/logIn') && verifiedToken) return NextResponse.redirect(new URL('/dashboard', req.url))
    if (!verifiedToken) return NextResponse.redirect(new URL('/logIn', req.url))
}

export const config = {
    matcher: ['/dashboard', '/logIn']
}