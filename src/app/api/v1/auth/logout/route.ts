import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export default async function POST(res: NextResponse) {
  const cookieStore = await cookies()
  cookieStore.delete('mytoken')
  return NextResponse.json({ message: 'Logout successful' }, { status: 200 })
}
