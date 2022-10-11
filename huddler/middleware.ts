
import { NextResponse, userAgent } from 'next/server'
import type { NextRequest } from 'next/server'
import { fetcher } from './src/utils/fetcher'
import { Session } from 'inspector'

export async function middleware(request: NextRequest) {
    //auth    
    if (request.nextUrl.pathname === '/profile') {
        const url = request.nextUrl.clone();
        url.pathname = 'profile/userNameHere';
        const response = NextResponse.redirect(url);
    
        response.cookies.set('Cookies', 'Yum')
        return response;
    }
    // if (request.nextUrl.pathname === '/' && session) {
    //     return NextResponse.redirect("http://localhost:3000/home")
    // }
    // if no session NextResponse.redirect("http://localhost:3000/")

    return NextResponse.next()
}