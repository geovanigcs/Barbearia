"use client"

import { Button } from "@/app/_components/ui/button"
import { Barbershop } from "@prisma/client"
import { ChevronLeftIcon, MapPinIcon, StarIcon, SmartphoneIcon } from "lucide-react"
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
            <Button onClick={handleBackClick} size="icon" variant="secondary" className="z-50 top-4 left-4 absolute">
                <ChevronLeftIcon />
            </Button>
            <Image 
                src={barbershop.imageUrl} 
                fill 
                alt={barbershop.name} 
                style={{ objectFit: "cover" }} 
                className="opacity-80" 
            />
        </div>
        
        <div className="px-5 pt-3 pb-6 border-b border-solid border-secondary">
            <h1 className="text-xl font-bold">{barbershop.name}</h1>
            
            <div className="flex items-center gap-2 mt-3">
                <MapPinIcon className="text-primary" size={18}/>
                <p className="text-sm">{barbershop.address}</p>
            </div>
            
            <div className="flex items-center gap-2 mt-2">
                <StarIcon className="text-primary fill-primary" size={18}/>
                <p className="text-sm">5,0 (899 avaliações)</p>
            </div>
        </div>

        <div className="px-5 py-6 border-b border-solid border-secondary">
            <h2 className="text-xs font-bold uppercase text-gray-400 mb-3">Sobre nós</h2>
            <p className="text-sm text-justify">{barbershop.description}</p>
        </div>

        <div className="px-5 py-6 border-b border-solid border-secondary space-y-3">
            <h2 className="text-xs font-bold uppercase text-gray-400 mb-3">Contatos</h2>
            {barbershop.phones.map((phone, index) => (
                <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <SmartphoneIcon size={18} />
                        <p className="text-sm">{phone}</p>
                    </div>
                    <Button variant="outline" size="sm">
                        Copiar
                    </Button>
                </div>
            ))}
        </div>
        </>
    )
}
 