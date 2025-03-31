import { SignJWT } from 'jose'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { email, password } = await req.json()
  if (email === 'mauro@mauro.com' && password === 'asd123') {
    const secretKey = new TextEncoder().encode('secret')
    const alg = 'HS256'

    const token = await new SignJWT({ email })
      .setProtectedHeader({ alg })
      .setExpirationTime('1h')
      .setIssuedAt()
      .sign(secretKey)

    const cookieStore = await cookies()

    cookieStore.set('mytoken', token, {
      httpOnly: true,
      maxAge: 60 * 60,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
    })

    return NextResponse.json({ message: 'Login successful' }, { status: 200 })
  }
  return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 })
}
