import { format } from "date-fns"
import { Header } from "./_components/header"
import { ptBR } from "date-fns/locale"
import { Search } from "./(home)/_components/search"
import { db } from "./_lib/prisma"
import { BarbershopItem } from "./(home)/_components/barbershop_item"
import { getServerSession } from "next-auth"
import { BookingItem } from "./_components/booking-item"
import { InfiniteCarousel } from "./_components/infinite-carousel"
import { DraggableCarousel } from "./_components/draggable-carousel"
import Link from "next/link"
import { Button } from "./_components/ui/button"

export const dynamic = 'force-dynamic'

export default async function Home() {
  const session = await getServerSession()
  
  // Buscar todas as barbearias
  const allBarbershops = await db.barbershop.findMany({
    orderBy: {
      name: "asc",
    },
  })

  // Recomendados: barbearias com rating >= 4.5
  const recommendedBarbershops = allBarbershops
    .filter((b) => parseFloat(b.rating.toString()) >= 4.5)
    .sort((a, b) => parseFloat(b.rating.toString()) - parseFloat(a.rating.toString()))

  // Populares: seleção aleatória
  const popularBarbershops = [...allBarbershops]
    .sort(() => Math.random() - 0.5)
    .slice(0, 10)

  const confirmedBookings = session?.user
    ? await db.booking.findMany({
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
    : []

  return (
    <div>
      <Header />
      <div className="px-5 pt-6">
        <h2 className="text-xl font-bold">
          Olá, {session?.user ? session.user.name?.split(" ")[0] : "bem-vindo"}!
        </h2>
        <p className="text-sm text-gray-400">
          {format(new Date(), "EEEE',' dd 'de' MMMM", {
            locale: ptBR,
          })}
        </p>
      </div>
      <div className="mt-6 px-5">
        <Search />
      </div>

      {confirmedBookings.length > 0 && (
        <div className="mt-6 px-5">
          <h2 className="mb-3 text-xs font-bold uppercase text-gray-400">
            Agendamentos
          </h2>
          <div className="space-y-3">
            {confirmedBookings.map((booking) => (
              <BookingItem key={booking.id} booking={booking} />
            ))}
          </div>
        </div>
      )}

      <div className="mt-6">
        <div className="mb-3 px-5 flex items-center justify-between">
          <h2 className="text-xs font-bold uppercase text-gray-400">
            Recomendados
          </h2>
        </div>
        <DraggableCarousel>
          {recommendedBarbershops.map((barbershop) => (
            <div key={barbershop.id} className="flex-shrink-0 first:ml-5 last:mr-5">
              <BarbershopItem barbershop={barbershop} />
            </div>
          ))}
        </DraggableCarousel>
      </div>

      <div className="mt-6">
        <div className="mb-3 px-5 flex items-center justify-between">
          <h2 className="text-xs font-bold uppercase text-gray-400">
            Populares
          </h2>
        </div>
        <DraggableCarousel>
          {popularBarbershops.map((barbershop) => (
            <div key={barbershop.id} className="flex-shrink-0 first:ml-5 last:mr-5">
              <BarbershopItem barbershop={barbershop} />
            </div>
          ))}
        </DraggableCarousel>
      </div>

      <div className="mb-[4.5rem] mt-6">
        <div className="mb-3 px-5 flex items-center justify-between">
          <h2 className="text-xs font-bold uppercase text-gray-400">
            Todas as Barbearias
          </h2>
          <Link href="/barbershops/all">
            <Button variant="ghost" size="sm" className="text-xs text-primary">
              Ver todas
            </Button>
          </Link>
        </div>
        <InfiniteCarousel speed={40}>
          {allBarbershops.map((barbershop) => (
            <div key={barbershop.id} className="flex-shrink-0">
              <BarbershopItem barbershop={barbershop} />
            </div>
          ))}
        </InfiniteCarousel>
      </div>
    </div>
  )
}
