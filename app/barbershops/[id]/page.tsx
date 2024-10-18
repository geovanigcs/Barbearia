import { db } from "@/app/_lib/prisma"
import { BarbershopInfo } from "./_components/barbershop-info"
import { ServiceItem } from "./_components/service-item"

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
        },
    })
    if (!barbershop){
        return null
    }
    return (
        <div>
            <BarbershopInfo barbershop={barbershop}/>
            <div className="px-5 flex flex-col gap-3">
                {barbershop.services.map((service) => (
                    <ServiceItem key={service.id} service={service} />
                ))}
            </div>
        </div>
    )
}

export default BarbershopsDetailPageProps;