"use client"

import { Button } from "@/app/_components/ui/button"
import { Barbershop } from "@prisma/client"
import { ChevronLeftIcon, MenuIcon, MapPinIcon, StarIcon } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"

interface barbershopInfoProps {
    barbershop: Barbershop
}

export const BarbershopInfo = ({barbershop}: barbershopInfoProps) => {
    const router = useRouter()
    const handleBackClick = () => {
        router.back()
    }
    return (
        <>
        <div className="h-[250px] w-full relative">
            <Button onClick={handleBackClick} size="icon" variant="outline" className="z-50 top-4 left-4 absolute">
                <ChevronLeftIcon />
            </Button>
            <Button size="icon" variant="outline" className="z-50 top-4 right-4 absolute">
                <MenuIcon />
            </Button>
            <Image src={barbershop.imageUrl} fill alt={barbershop.name} style={{ objectFit: "cover" }} className="opacity-75" />
        </div>
        <div className="px-5 pt-3 pb-6 border-b border-solid border-secondary">
            <h1 className="text-xl font-bold px-5 py-3">{barbershop.name}</h1>
            <div className="flex items-center gap-1 mt-2">
                <MapPinIcon className="text-primary" size={18}/>
                <p className="text-sm">{barbershop.address}</p>
            </div>
            <div className="flex items-center gap-1 mt-2">
                <StarIcon className="text-primary" size={18}/>
                <p className="text-sm">5,0 (899 Avaliações)</p>
            </div>
        </div>
        </>
    )
}
 