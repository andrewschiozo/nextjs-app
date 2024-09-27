import { PrismaClient } from '@prisma/client'
import { NextRequest,NextResponse } from 'next/server'

const prisma = new PrismaClient()

export const GET = async (req: NextRequest) => {
    const users = await prisma.user.findMany()
    return NextResponse.json({users})
}

export const POST = async (req: NextRequest) => {
    const body = await req.json()
    const user = await prisma.user.create({data: body})
    return NextResponse.json({user})
}