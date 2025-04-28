// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const token = request.cookies.get('access_token')?.value
    if (token && request.nextUrl.pathname === '/auth') {
        return NextResponse.redirect(new URL('/', request.url))
    }
    if (!token && request.nextUrl.pathname !== '/auth') {
        return NextResponse.redirect(new URL('/auth', request.url))
    }
    return NextResponse.next()
}

export const config = {
    matcher: ['/((?!_next|public).*)'],
}