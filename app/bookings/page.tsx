import { getServerSession } from "next-auth"
import { Header } from "../_components/header"
import { redirect } from "next/navigation"
import { db } from "../_lib/prisma"
import { BookingItem } from "../_components/booking-item"

const BookingsPage = async () => {
    const session = await getServerSession()

    // Se não houver sessão, mostra mensagem pedindo login
    if (!session?.user) {
        return (
            <>
                <Header />
                <div className="px-5 py-6">
                    <h1 className="text-xl font-bold mb-6">Agendamentos</h1>
                    <p className="text-gray-400">Faça login para ver seus agendamentos.</p>
                </div>
            </>
        )
    }

    const confirmedBookings = await db.booking.findMany({
        where: {
            user: {
                email: session.user.email,
            },
            date: {
                gte: new Date(),
            },
        },
        include: {
            service: {
                include: {
                    barbershop: true,
                },
            },
        },
        orderBy: {
            date: "asc",
        },
    })

    const finishedBookings = await db.booking.findMany({
        where: {
            user: {
                email: session.user.email,
            },
            date: {
                lt: new Date(),
            },
        },
        include: {
            service: {
                include: {
                    barbershop: true,
                },
            },
        },
        orderBy: {
            date: "desc",
        },
    })

    return (
        <>
            <Header />
            
            <div className="px-5 py-6">
                <h1 className="text-xl font-bold mb-6">Agendamentos</h1>

                {confirmedBookings.length > 0 && (
                    <div className="mb-6">
                        <h2 className="text-xs uppercase text-gray-400 font-bold mb-3">
                            Confirmados
                        </h2>
                        <div className="space-y-3">
                            {confirmedBookings.map((booking) => (
                                <BookingItem 
                                    key={booking.id} 
                                    booking={booking}
                                />
                            ))}
                        </div>
                    </div>
                )}

                {finishedBookings.length > 0 && (
                    <div>
                        <h2 className="text-xs uppercase text-gray-400 font-bold mb-3">
                            Finalizados
                        </h2>
                        <div className="space-y-3">
                            {finishedBookings.map((booking) => (
                                <BookingItem 
                                    key={booking.id} 
                                    booking={booking}
                                />
                            ))}
                        </div>
                    </div>
                )}

                {confirmedBookings.length === 0 && finishedBookings.length === 0 && (
                    <p className="text-gray-400">Você não possui agendamentos.</p>
                )}
            </div>
        </>
    )
}

export default BookingsPage
