import { Button } from "@/app/_components/ui/button"
import { db } from "@/app/_lib/prisma"
import { ChevronLeftIcon, MapPinIcon, MenuIcon, StarIcon } from "lucide-react"
import { BarbershopInfo } from "./_components/barbershop-info"

interface BarbershopsDetailPageProps {
    params: {
        id?: string
    }
}

const BarbershopsDetailPageProps = async ({ params }: BarbershopsDetailPageProps) => {
    if(!params.id){
        return null
    }
    const barbershop = await db.barbershop.findUnique({
        where: {
            id: params.id,
        },
    })
    if (!barbershop){
        return null
    }
    return (
        <BarbershopInfo barbershop={barbershop}/>
    )
}

export default BarbershopsDetailPageProps;