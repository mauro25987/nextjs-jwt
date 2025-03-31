import { jwtVerify } from 'jose'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET() {
  const cookieStore = await cookies()
  const token = cookieStore.get('mytoken')?.value

  if (!token) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { payload } = await jwtVerify(token, new TextEncoder().encode('secret'))
    return NextResponse.json({ message: 'Profile', email: payload.email }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ message: 'Token verification failed' }, { status: 401 })
  }
}
