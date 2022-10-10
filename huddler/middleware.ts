
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { fetcher } from './src/utils/fetcher'

export async function middleware(request: NextRequest) {
    if (request.nextUrl.pathname === '/profile/asd') {
        console.log('profile')
        return NextResponse.rewrite("url")
    }
    if (request.nextUrl.pathname === '/create') {
        console.log('create')
    }

    return NextResponse.next()
}