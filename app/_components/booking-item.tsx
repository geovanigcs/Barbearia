"use client"

import { Prisma } from "@prisma/client"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Badge } from "./ui/badge"
import { Card, CardContent } from "./ui/card"
import { format, isFuture } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet"
import Image from "next/image"
import { Button } from "./ui/button"
import { cancelBooking } from "../_actions/cancel-booking"
import { toast } from "sonner"
import { useState } from "react"
import { Loader2 } from "lucide-react"

interface BookingItemProps {
    booking: Prisma.BookingGetPayload<{
        include: {
            service: {
                include: {
                    barbershop: true
                }
            }
        }
    }>
}

export const BookingItem = ({ booking }: BookingItemProps) => {
    const [isDeleteLoading, setIsDeleteLoading] = useState(false)
    const isBookingConfirmed = isFuture(booking.date)

    const handleCancelClick = async () => {
        setIsDeleteLoading(true)
        
        try {
            await cancelBooking(booking.id)
            
            toast.success("Reserva cancelada com sucesso!")
        } catch (error) {
            console.error(error)
            toast.error("Erro ao cancelar reserva. Tente novamente.")
        } finally {
            setIsDeleteLoading(false)
        }
    }

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Card className="min-w-full cursor-pointer">
                    <CardContent className="p-0 flex">
                        <div className="flex flex-col gap-2 py-5 pl-5 flex-1">
                            <Badge 
                                variant={isBookingConfirmed ? "default" : "secondary"}
                                className="w-fit"
                            >
                                {isBookingConfirmed ? "Confirmado" : "Finalizado"}
                            </Badge>
                            <h2 className="font-bold">{booking.service.name}</h2>
                            <div className="flex items-center gap-2">
                                <Avatar className="h-6 w-6">
                                    <AvatarImage src={booking.service.barbershop.imageUrl} />
                                    <AvatarFallback>A</AvatarFallback>
                                </Avatar>
                                <h3 className="text-sm">{booking.service.barbershop.name}</h3>
                            </div>
                        </div>
                        <div className="flex flex-col items-center justify-center border-l border-solid border-secondary px-5">
                            <p className="text-sm capitalize">
                                {format(booking.date, "MMMM", { locale: ptBR })}
                            </p>
                            <p className="text-2xl">{format(booking.date, "dd")}</p>
                            <p className="text-sm">{format(booking.date, "HH:mm")}</p>
                        </div>
                    </CardContent>
                </Card>
            </SheetTrigger>

            <SheetContent className="px-0">
                <SheetHeader className="text-left px-5 pb-6 border-b border-solid border-secondary">
                    <SheetTitle>Informações da Reserva</SheetTitle>
                </SheetHeader>

                <div className="px-5">
                    <div className="relative h-[180px] w-full mt-6">
                        <Image 
                            src="/barbershop-map.svg" 
                            fill 
                            alt={booking.service.barbershop.name}
                            style={{ objectFit: "cover" }}
                        />

                        <div className="w-full absolute bottom-4 left-0 px-5">
                            <Card>
                                <CardContent className="p-3 flex gap-2">
                                    <Avatar>
                                        <AvatarImage src={booking.service.barbershop.imageUrl} />
                                    </Avatar>
                                    <div>
                                        <h2 className="font-bold">{booking.service.barbershop.name}</h2>
                                        <h3 className="text-xs overflow-hidden text-nowrap text-ellipsis">
                                            {booking.service.barbershop.address}
                                        </h3>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    <Badge 
                        variant={isBookingConfirmed ? "default" : "secondary"}
                        className="w-fit my-3"
                    >
                        {isBookingConfirmed ? "Confirmado" : "Finalizado"}
                    </Badge>

                    <Card>
                        <CardContent className="p-3 space-y-3">
                            <div className="flex justify-between">
                                <h2 className="font-bold">{booking.service.name}</h2>
                                <h3 className="font-bold text-sm">
                                    {Intl.NumberFormat("pt-BR", {
                                        style: "currency",
                                        currency: "BRL",
                                    }).format(Number(booking.service.price))}
                                </h3>
                            </div>

                            <div className="flex justify-between">
                                <h3 className="text-gray-400 text-sm">Data</h3>
                                <h4 className="text-sm capitalize">
                                    {format(booking.date, "dd 'de' MMMM", {
                                        locale: ptBR,
                                    })}
                                </h4>
                            </div>

                            <div className="flex justify-between">
                                <h3 className="text-gray-400 text-sm">Horário</h3>
                                <h4 className="text-sm">{format(booking.date, "HH:mm")}</h4>
                            </div>

                            <div className="flex justify-between">
                                <h3 className="text-gray-400 text-sm">Barbearia</h3>
                                <h4 className="text-sm">{booking.service.barbershop.name}</h4>
                            </div>
                        </CardContent>
                    </Card>

                    <SheetFooter className="flex-row gap-3 mt-6">
                        <SheetClose asChild>
                            <Button className="w-full" variant="secondary">
                                Voltar
                            </Button>
                        </SheetClose>

                        {isBookingConfirmed && (
                            <Button
                                disabled={isDeleteLoading}
                                className="w-full"
                                variant="destructive"
                                onClick={handleCancelClick}
                            >
                                {isDeleteLoading && (
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                )}
                                Cancelar Reserva
                            </Button>
                        )}
                    </SheetFooter>
                </div>
            </SheetContent>
        </Sheet>
    )
}
