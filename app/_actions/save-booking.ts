"use server"

import { db } from "@/app/_lib/prisma"
import { revalidatePath } from "next/cache"
import { getServerSession } from "next-auth"

interface SaveBookingParams {
    serviceId: string
    date: Date
}

export const saveBooking = async (params: SaveBookingParams) => {
    const session = await getServerSession()
    
    if (!session?.user) {
        throw new Error("Usuário não autenticado")
    }

    const user = await db.user.findUnique({
        where: {
            email: session.user.email!,
        },
    })

    if (!user) {
        throw new Error("Usuário não encontrado")
    }

    await db.booking.create({
        data: {
            serviceId: params.serviceId,
            userId: user.id,
            date: params.date,
        },
    })

    revalidatePath("/")
    revalidatePath("/bookings")
}
