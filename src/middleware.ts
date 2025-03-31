import { jwtVerify } from 'jose'
import { cookies } from 'next/headers'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const cookieStore = await cookies()
  const token = cookieStore.get('mytoken')?.value

  if (!token) {
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }

  try {
    await jwtVerify(token, new TextEncoder().encode('secret'))
    return NextResponse.next()
  } catch (error) {
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/dashboard/:path*',
}
