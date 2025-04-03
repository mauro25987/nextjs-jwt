import { prisma } from '@/lib/prisma'
import bcrypt from 'bcrypt'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { email, password } = await req.json()
  const hashedPassword = await bcrypt.hash(password, 10)

  try {
    await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    })
  } catch (error) {
    return NextResponse.json({ message: 'Error' }, { status: 400 })
  }
  return NextResponse.json({ message: 'Register' }, { status: 200 })
}
