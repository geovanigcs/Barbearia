import { BarbershopItem } from "@/app/(home)/_components/barbershop_item"
import { Header } from "@/app/_components/header"
import { db } from "@/app/_lib/prisma"
import { redirect } from "next/navigation"

interface BarbershopsPageProps {
    searchParams: {
        search?: string
    }
}

const BarbershopsPage = async ({ searchParams }: BarbershopsPageProps) => {
    if (!searchParams.search) {
        return redirect("/")
    }

    const barbershops = await db.barbershop.findMany({
        where: {
            name: {
                contains: searchParams.search,
                mode: "insensitive",
            },
        },
    })

    return (
        <>
            <Header />
            
            <div className="px-5 py-6">
                <h2 className="text-xl font-bold mb-6">
                    Resultados para &quot;{searchParams.search}&quot;
                </h2>

                {barbershops.length === 0 ? (
                    <p className="text-gray-400">
                        Nenhuma barbearia encontrada.
                    </p>
                ) : (
                    <div className="grid grid-cols-2 gap-4">
                        {barbershops.map((barbershop) => (
                            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
                        ))}
                    </div>
                )}
            </div>
        </>
    )
}

export default BarbershopsPage
