import { db } from "@/app/_lib/prisma"
import { BarbershopInfo } from "./_components/barbershop-info"
import { ServiceItem } from "@/app/_components/service-item-with-booking"
import Image from "next/image"

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
        include: {
            services: true,
            barbers: true,
        },
    })
    if (!barbershop){
        return null
    }
    return (
        <div>
            <BarbershopInfo barbershop={barbershop}/>
            
            {/* Seção de Barbeiros */}
            {barbershop.barbers.length > 0 && (
                <div className="px-5 py-6 space-y-4 border-b border-solid border-secondary">
                    <h2 className="text-xs font-bold uppercase text-gray-400 mb-4">Nossa Equipe</h2>
                    <div className="grid grid-cols-2 gap-3">
                        {barbershop.barbers.map((barber) => (
                            <div 
                                key={barber.id}
                                className="bg-card rounded-2xl overflow-hidden"
                            >
                                <div className="relative w-full h-32 overflow-hidden">
                                    <Image 
                                        src={barber.imageUrl} 
                                        alt={barber.name}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div className="p-3 space-y-1">
                                    <h3 className="font-bold text-sm truncate">{barber.name}</h3>
                                    <p className="text-xs text-gray-400 truncate">{barber.specialty}</p>
                                    <p className="text-xs text-gray-500">{barber.workingHours}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Seção de Serviços */}
            <div className="px-5 py-6">
                <h2 className="text-xs font-bold uppercase text-gray-400 mb-3">Serviços</h2>
                <div className="grid grid-cols-2 gap-3">
                    {barbershop.services.map((service) => (
                        <ServiceItem 
                            key={service.id} 
                            service={service}
                            barbershop={barbershop}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default BarbershopsDetailPageProps;