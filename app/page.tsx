'use client'
import { format } from "date-fns"
import { Header } from "./_components/header"
import { ptBR } from "date-fns/locale"
import { Search } from "./(home)/_components/search"
import { BookingItem } from "./_components/ui/booking-item"
import { db } from "./_lib/prisma"
import { BarbershopItem } from "./(home)/_components/barbershop_item"

export default async function Home() {
  const barbershop = await db.barbershop.findMany({})
  return (
    <div>
      <Header />
      <div className="px-5 pt-5">
        <h2>Olá, Geovani!</h2>
        <p>
          {format(new Date(), "EEEE',' dd 'de' MMMM ", {
            locale: ptBR,
          })}
        </p>
      </div>
      <div className="mt-6 px-5">
        <Search />
      </div>
      <div className="mt-6 px-5">
        <h2 className="mb-3 text-xs font-bold uppercase text-gray-400">
          Agendamentos
        </h2>
        <BookingItem />
      </div>
      <div className="mt-6">
        <h2 className="mb-3 px-5 text-xs font-bold uppercase text-gray-400">
          Recomendados
        </h2>
        <div className="flex gap-4 overflow-x-auto px-5 [&::-webkit-scrollbar]:hidden">
          {barbershop.map((barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>
      </div>
      <div className="mb-[4.5rem] mt-6">
        <h2 className="mb-3 px-5 text-xs font-bold uppercase text-gray-400">
          Populares
        </h2>
        <div className="flex gap-4 overflow-x-auto px-5 [&::-webkit-scrollbar]:hidden">
          {barbershop.map((barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>
      </div>
    </div>
  )
}
