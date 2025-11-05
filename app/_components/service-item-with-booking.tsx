"use client"

import { Barbershop, Service } from "@prisma/client"
import Image from "next/image"
import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet"
import { Calendar } from "./ui/calendar"
import { useState } from "react"
import { ptBR } from "date-fns/locale"
import { format, setHours, setMinutes } from "date-fns"
import { saveBooking } from "../_actions/save-booking"
import { toast } from "sonner"
import { useSession } from "next-auth/react"
import { signIn } from "next-auth/react"

interface ServiceItemProps {
    service: Service
    barbershop: Barbershop
}

const TIME_LIST = [
    "08:00",
    "08:30",
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
    "18:00",
]

export const ServiceItem = ({ service, barbershop }: ServiceItemProps) => {
    const { data } = useSession()
    const [date, setDate] = useState<Date | undefined>(undefined)
    const [hour, setHour] = useState<string | undefined>(undefined)
    const [submitIsLoading, setSubmitIsLoading] = useState(false)

    const handleDateClick = (date: Date | undefined) => {
        setDate(date)
        setHour(undefined)
    }

    const handleHourClick = (time: string) => {
        setHour(time)
    }

    const handleBookingClick = () => {
        if (!data?.user) {
            return signIn("google")
        }
    }

    const handleBookingSubmit = async () => {
        setSubmitIsLoading(true)
        
        try {
            if (!date || !hour) return

            const dateHour = Number(hour.split(":")[0])
            const dateMinutes = Number(hour.split(":")[1])
            
            const newDate = setMinutes(setHours(date, dateHour), dateMinutes)

            await saveBooking({
                serviceId: service.id,
                date: newDate,
            })

            toast.success("Reserva realizada com sucesso!", {
                description: format(newDate, "'Para' dd 'de' MMMM 'às' HH':'mm'.'", {
                    locale: ptBR,
                }),
                action: {
                    label: "Visualizar",
                    onClick: () => console.log("Undo"),
                },
            })

            setHour(undefined)
            setDate(undefined)
        } catch (error) {
            console.error(error)
            toast.error("Erro ao criar reserva!")
        } finally {
            setSubmitIsLoading(false)
        }
    }

    return (
        <Card>
            <CardContent className='p-0 flex flex-col'>
                <div className="relative h-32 w-full">
                    <Image 
                        className='rounded-t-lg object-cover' 
                        src={service.imageUrl} 
                        fill 
                        alt={service.name}
                    />
                </div>
                
                <div className="flex flex-col p-3 gap-2">
                    <div>
                        <h2 className="font-bold text-sm truncate">{service.name}</h2>
                        <p className="text-xs text-gray-400 line-clamp-2">{service.description}</p>
                    </div>
                    
                    <div className="flex items-center justify-between">
                        <p className="text-primary text-sm font-bold">
                            {Intl.NumberFormat('pt-BR', {
                                style: 'currency',
                                currency: 'BRL',
                            }).format(Number(service.price))}
                        </p>
                        
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button 
                                    variant="secondary" 
                                    size="sm"
                                    onClick={handleBookingClick}
                                >
                                    Reservar
                                </Button>
                            </SheetTrigger>

                            <SheetContent className="p-0 overflow-y-auto">
                                <SheetHeader className="text-left px-5 py-6 border-b border-solid border-secondary">
                                    <SheetTitle>Fazer Reserva</SheetTitle>
                                </SheetHeader>

                                <div className="py-6">
                                    <div className="px-5">
                                        <div className="flex gap-3 items-center border-b border-solid border-secondary pb-6">
                                            <div className="relative min-h-[110px] min-w-[110px] max-h-[110px] max-w-[110px]">
                                                <Image 
                                                    className='rounded-lg object-cover' 
                                                    src={service.imageUrl} 
                                                    fill 
                                                    alt={service.name}
                                                />
                                            </div>
                                            <div className="flex flex-col">
                                                <h2 className="font-bold">{service.name}</h2>
                                                <p className="text-sm text-gray-400">{service.description}</p>
                                                <p className="text-primary text-sm font-bold mt-2">
                                                    {Intl.NumberFormat('pt-BR', {
                                                        style: 'currency',
                                                        currency: 'BRL',
                                                    }).format(Number(service.price))}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="px-5 py-6 border-b border-solid border-secondary">
                                        <Calendar
                                            mode="single"
                                            selected={date}
                                            onSelect={handleDateClick}
                                            locale={ptBR}
                                            fromDate={new Date()}
                                            styles={{
                                                head_cell: {
                                                    width: "100%",
                                                    textTransform: "capitalize"
                                                },
                                                cell: {
                                                    width: "100%"
                                                },
                                                button: {
                                                    width: "100%"
                                                },
                                                nav_button_previous: {
                                                    width: "32px",
                                                    height: "32px"
                                                },
                                                nav_button_next: {
                                                    width: "32px",
                                                    height: "32px"
                                                },
                                                caption: {
                                                    textTransform: "capitalize"
                                                }
                                            }}
                                        />
                                    </div>

                                    {date && (
                                        <div className="px-5 py-6 border-b border-solid border-secondary">
                                            <h3 className="text-xs uppercase text-gray-400 font-bold mb-3">
                                                Horário
                                            </h3>
                                            <div className="grid grid-cols-3 gap-2">
                                                {TIME_LIST.map((time) => (
                                                    <Button
                                                        key={time}
                                                        variant={hour === time ? "default" : "outline"}
                                                        className="rounded-full"
                                                        onClick={() => handleHourClick(time)}
                                                    >
                                                        {time}
                                                    </Button>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {date && hour && (
                                        <div className="px-5 py-6">
                                            <Card>
                                                <CardContent className="p-3 space-y-3">
                                                    <div className="flex justify-between items-center">
                                                        <h3 className="font-bold">{service.name}</h3>
                                                        <p className="text-sm font-bold">
                                                            {Intl.NumberFormat('pt-BR', {
                                                                style: 'currency',
                                                                currency: 'BRL',
                                                            }).format(Number(service.price))}
                                                        </p>
                                                    </div>

                                                    <div className="flex justify-between items-center text-sm">
                                                        <p className="text-gray-400">Data</p>
                                                        <p className="capitalize">
                                                            {format(date, "dd 'de' MMMM", {
                                                                locale: ptBR
                                                            })}
                                                        </p>
                                                    </div>

                                                    <div className="flex justify-between items-center text-sm">
                                                        <p className="text-gray-400">Horário</p>
                                                        <p>{hour}</p>
                                                    </div>

                                                    <div className="flex justify-between items-center text-sm">
                                                        <p className="text-gray-400">Barbearia</p>
                                                        <p>{barbershop.name}</p>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        </div>
                                    )}
                                </div>

                                <SheetFooter className="px-5 pb-6">
                                    <Button 
                                        onClick={handleBookingSubmit}
                                        disabled={!date || !hour || submitIsLoading}
                                        className="w-full"
                                    >
                                        {submitIsLoading ? "Confirmando..." : "Confirmar reserva"}
                                    </Button>
                                </SheetFooter>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
