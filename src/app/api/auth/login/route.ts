import { PrismaClient } from '@prisma/client'
import { NextRequest,NextResponse } from 'next/server'

const prisma = new PrismaClient()

export const POST = async (req: NextRequest) => {
    const body = await req.json()
    const {username, password} = body
    
    const user = await prisma.user.findFirst({where: {email: username}})

    if(user && (password === user.password))
        return NextResponse.json({user})

    return NextResponse.json({ message: "Credenciais inválidas" }, { status: 404 });
}