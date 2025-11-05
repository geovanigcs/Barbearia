"use client"

import Image from "next/image";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { SideMenu } from "./side-menu";
import { Button } from "./ui/button";
import { LogInIcon } from "lucide-react";
import { signIn, useSession } from "next-auth/react";

export const Header = () => {
    const { data, status } = useSession()

    const handleLoginClick = () => {
        signIn("google")
    }

    return (
        <div className="px-5 py-6 flex items-center justify-between">
            <Image src="/Logo_barber.svg" alt={"Gigio's Barber"} height={22} width={120} />
            
            <SideMenu />

            <div className="flex items-center gap-3">
                {status === "authenticated" && data?.user ? (
                    <>
                        <div className="text-right hidden sm:block">
                            <p className="text-sm font-semibold">{data.user.name}</p>
                        </div>
                        <Avatar>
                            <AvatarImage src={data.user.image ?? ""} />
                            <AvatarFallback>{data.user.name?.charAt(0).toUpperCase()}</AvatarFallback>
                        </Avatar>
                    </>
                ) : (
                    <Button variant="outline" size="sm" onClick={handleLoginClick}>
                        <LogInIcon size={16} className="mr-2" />
                        Fazer Login
                    </Button>
                )}
            </div>
        </div>
    )
}
