import { format } from "date-fns";
import { Header } from "./_components/header";
import { ptBR } from "date-fns/locale";

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
    </div>

  )
}
