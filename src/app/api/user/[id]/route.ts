import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export const GET = async (req: NextRequest, context: { params: { id: string } }) => {
    const id = Number(context.params.id || 0);
    
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) {
        return NextResponse.json({ message: "User get not found" }, { status: 404 });
    }
    return NextResponse.json({ user });
}

export const DELETE = async (req: NextRequest, context: { params: { id: string } }) => {
    const id = Number(context.params.id || 0);
    const userFind = await prisma.user.findUnique({ where: { id } });
    
    if(!userFind) {
        return NextResponse.json({message: 'User to delete not found'}, {status: 500})
    }

    const userDelete = await prisma.user.delete({where: { id }})
    
    return NextResponse.json({})
}

export const PUT = async (req: NextRequest, context: { params: { id: string } }) => {
    const id = Number(context.params.id || 0);
    const body = await req.json()
    const user = await prisma.user.update({where: { id }, data: body})
    if(!user) {
        return NextResponse.json({message: 'User to update not found'}, {status: 500})
    }
    return NextResponse.json({user})
}