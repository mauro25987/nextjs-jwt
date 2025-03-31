import { jwtVerify } from 'jose'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST() {
  const cookieStore = await cookies()
  const token = cookieStore.get('mytoken')?.value

  if (!token) {
    return NextResponse.json({ message: 'No token found' }, { status: 401 })
  }

  try {
    await jwtVerify(token, new TextEncoder().encode('secret'))
    cookieStore.delete('mytoken')
    return NextResponse.json({ message: 'Logout successful' }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ message: 'Token verification failed' }, { status: 401 })
  }
}
