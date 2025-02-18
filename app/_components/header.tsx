import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { MenuIcon } from "lucide-react";

export const Header = () => {
    return (
        <Card>
            <CardContent className="px-5 py-5 justify-between items-center flex flex-row">
                <Image src="/Logo_barber.svg" alt={"Gigio's Barber"} height={22} width={120} />
                <Button variant="outline" size="icon">
                    <MenuIcon size={22}/>
                </Button>
            </CardContent>
        </Card>
    )
}
