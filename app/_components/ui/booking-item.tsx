import { Avatar, AvatarFallback, AvatarImage } from "./avatar"
import { Badge } from "./badge"
import { Card, CardContent } from "./card"


export const BookingItem = () => {
    return ( 
    <Card>
        <CardContent className="p-5 flex justify-between py-0">
            <div className="flex flex-col gap-2 py-5">
                <Badge className="bg-[#221C3D] text-primary hover:bg-[#221C3D] w-fit">Confirmado</Badge>
                <h2 className="fonts-bold">Corte de Cabelo</h2>
                <div className="flex">
                    <Avatar className="h-6 w-6">
                        <AvatarImage src="https://utfs.io/f/0ddfbd26-a424-43a0-aaf3-c3f1dc6be6d1-1kgxo7.png"/>
                        <AvatarFallback>A</AvatarFallback>
                    </Avatar>
                    <h3 className="text-sm">Vintage Barber</h3>
                </div>
            </div>
            <div className="flex flex-col items-center justify-center px-3 bolder-l border-solid border-secondary">
                <p className="text-sm">Fevereiro</p>
                <p className="text-2xl">06</p>
                <p className="text-sm">09:45</p>
            </div>

        </CardContent>
    </Card>
     )
}
 