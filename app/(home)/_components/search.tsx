"use client";

import { Button } from "@/app/_components/ui/button"
import { Input } from "@/app/_components/ui/input"
import { SearchIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import { FormEvent, useState } from "react"

export const Search = () => {
    const router = useRouter()
    const [search, setSearch] = useState("")

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!search.trim()) return
        
        router.push(`/barbershops?search=${search}`)
    }

    return (
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
            <Input 
                placeholder="Busque por uma barbearia..." 
                className="flex-1"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <Button type="submit" size="icon">
                <SearchIcon size={20} />
            </Button>
        </form>
    )
}
