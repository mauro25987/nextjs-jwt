import { jwtVerify } from 'jose'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const cookieStore = req.cookies.get('mytoken')?.value

  if (!cookieStore) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

  try {
    const token = await jwtVerify(cookieStore, new TextEncoder().encode('secret'))
    return NextResponse.json({ message: 'Profile', email: token.payload.email }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ message: 'Token Invalid' }, { status: 401 })
  }
}
