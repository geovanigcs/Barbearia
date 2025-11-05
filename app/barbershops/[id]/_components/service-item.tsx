import { Button } from '@/app/_components/ui/button'
import { Card, CardContent } from '@/app/_components/ui/card'
import { Service } from '@prisma/client'
import Image from "next/image"

interface ServiceItemProps {
    service: Service
}

export const ServiceItem = ({ service }: ServiceItemProps) => {
    return (
        <Card>
            <CardContent className='p-3 flex gap-3'>
                <div className="relative min-h-[110px] min-w-[110px] max-h-[110px] max-w-[110px]">
                    <Image 
                        className='rounded-lg object-cover' 
                        src={service.imageUrl} 
                        fill 
                        alt={service.name}
                    />
                </div>
                
                <div className="flex flex-col w-full justify-between">
                    <div>
                        <h2 className="font-bold text-sm">{service.name}</h2>
                        <p className="text-sm text-gray-400 mt-1">{service.description}</p>
                    </div>
                    
                    <div className="flex items-center justify-between mt-3">
                        <p className="text-primary text-sm font-bold">
                            {Intl.NumberFormat('pt-BR', {
                                style: 'currency',
                                currency: 'BRL',
                            }).format(Number(service.price))}
                        </p>
                        <Button variant="secondary" size="sm">
                            Reservar
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
 