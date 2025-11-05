import { Header } from "@/app/_components/header"
import { db } from "@/app/_lib/prisma"
import { BarbershopItem } from "@/app/(home)/_components/barbershop_item"

export const dynamic = 'force-dynamic'

export default async function AllBarbershopsPage() {
  const barbershops = await db.barbershop.findMany({
    orderBy: {
      rating: "desc",
    },
  })

  return (
    <div>
      <Header />
      <div className="px-5 py-6">
        <h1 className="text-xl font-bold mb-2">Todas as Barbearias</h1>
        <p className="text-sm text-gray-400 mb-6">
          {barbershops.length} barbearias encontradas
        </p>

        <div className="grid grid-cols-2 gap-4">
          {barbershops.map((barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>
      </div>
    </div>
  )
}
