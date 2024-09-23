import { format } from "date-fns";
import { Header } from "./_components/header";
import { ptBR } from "date-fns/locale";
import { Search } from "./(home)/_components/search";
import { BookingItem } from "./_components/ui/booking-item";

export default function Home() {
  return (
    <div>
      <Header />
      <div className="px-5 pt-5">
        <h2>Olá, Geovani!</h2>
        <p>{format(new Date(), "EEEE',' dd 'de' MMMM ", {
          locale: ptBR,
        })}</p>
      </div>
      <div className="px-5 mt-6">
        <Search />
      </div>
      <div className="px-5 mt-6">
        <h2 className="text-xs uppercase text-gray-400 font-bold mb-3">Agendamentos</h2>
        <BookingItem />
      </div>
    </div>
  )
}
