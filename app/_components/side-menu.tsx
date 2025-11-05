"use client"

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet"
import { Button } from "./ui/button"
import { CalendarIcon, HomeIcon, LogInIcon, LogOutIcon } from "lucide-react"
import { signIn, signOut, useSession } from "next-auth/react"
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar"
import Link from "next/link"

export const SideMenu = () => {
    const { data, status } = useSession()

    const handleLoginClick = () => {
        signIn("google")
    }

    const handleLogoutClick = () => {
        signOut()
    }

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                    <CalendarIcon size={16}/>
                    Agendamentos
                </Button>
            </SheetTrigger>
            <SheetContent className="p-0">
                <SheetHeader className="text-left px-5 py-6 border-b border-solid border-secondary">
                    <SheetTitle>Menu</SheetTitle>
                </SheetHeader>

                {status === "authenticated" && data?.user ? (
                    <div className="px-5 py-6 flex items-center gap-3 border-b border-solid border-secondary">
                        <Avatar>
                            <AvatarImage src={data.user.image ?? ""} />
                            <AvatarFallback>{data.user.name?.charAt(0).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div>
                            <h2 className="font-bold">{data.user.name}</h2>
                            <p className="text-xs text-gray-400">{data.user.email}</p>
                        </div>
                    </div>
                ) : (
                    <div className="px-5 py-6 flex flex-col gap-3 border-b border-solid border-secondary">
                        <div className="flex items-center gap-2">
                            <Avatar>
                                <AvatarFallback>?</AvatarFallback>
                            </Avatar>
                            <div>
                                <h2 className="font-bold">Olá, faça seu login!</h2>
                                <p className="text-xs text-gray-400">Entre para agendar</p>
                            </div>
                        </div>
                        <Button variant="secondary" className="w-full justify-start gap-2" onClick={handleLoginClick}>
                            <LogInIcon size={18} />
                            Fazer Login
                        </Button>
                    </div>
                )}

                <div className="px-5 py-6 space-y-2 border-b border-solid border-secondary">
                    <Button variant="outline" className="w-full justify-start gap-2" asChild>
                        <Link href="/">
                            <HomeIcon size={18} />
                            Início
                        </Link>
                    </Button>
                    {status === "authenticated" && (
                        <Button variant="outline" className="w-full justify-start gap-2" asChild>
                            <Link href="/bookings">
                                <CalendarIcon size={18} />
                                Meus Agendamentos
                            </Link>
                        </Button>
                    )}
                </div>

                {status === "authenticated" && (
                    <div className="px-5 py-6 border-t border-solid border-secondary">
                        <Button 
                            variant="outline" 
                            className="w-full justify-start gap-2"
                            onClick={handleLogoutClick}
                        >
                            <LogOutIcon size={18} />
                            Sair da conta
                        </Button>
                    </div>
                )}
            </SheetContent>
        </Sheet>
    )
}
