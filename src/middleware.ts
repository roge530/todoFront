import { NextRequest, NextResponse } from "next/server";

export default function middlewere(req:NextRequest) {
    const storedToken = req.cookies.get("token")?.value;
    const validToken: boolean = (storedToken !== null && storedToken !== '' && storedToken !== undefined);
    if (req.nextUrl.pathname.startsWith('/login') && !validToken) return
    
    if (req.url.includes('/login') && validToken) return NextResponse.rewrite(new URL('/dashboard', req.url))
    if (!validToken) return NextResponse.rewrite(new URL('/login', req.url))
}

export const config = {
    matcher: ['/dashboard', '/login']
}