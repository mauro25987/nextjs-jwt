import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { email, password } = await req.json()

  if (email === 'mauro@mauro.com') {
    return NextResponse.json({ message: 'Email already registered' }, { status: 400 })
  }

  return NextResponse.json({ message: 'Register' }, { status: 200 })
}
