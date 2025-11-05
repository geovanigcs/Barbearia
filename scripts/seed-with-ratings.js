const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// Função para gerar rating aleatório entre min e max
function randomRating(min, max) {
  return (Math.random() * (max - min) + min).toFixed(1);
}

// Função para selecionar aleatoriamente itens de um array
function randomItems(arr, count) {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

async function main() {
  try {
    // Limpar dados existentes
    console.log("🧹 Limpando banco de dados...");
    await prisma.booking.deleteMany({});
    await prisma.service.deleteMany({});
    await prisma.barber.deleteMany({});
    await prisma.barbershop.deleteMany({});

    console.log("🏪 Criando barbearias com ratings variados...");

    const barbershopsData = [
      // Barbearias 5.0 estrelas (Recomendadas)
      {
        name: "Vintage Barber",
        address: "Rua da Consolação, 1234 - Consolação, São Paulo",
        description:
          "Barbearia clássica com ambiente retrô e serviços premium de alta qualidade.",
        rating: "5.0",
        phones: ["(11) 98765-4321", "(11) 3456-7890"],
        imageUrl: "https://utfs.io/f/c97a2dc9-cf0f-4bc9-a6f3-9c1efaef1ac3-16p.png",
      },
      {
        name: "Gentleman's Cut",
        address: "Av. Paulista, 2500 - Bela Vista, São Paulo",
        description:
          "Cortes sofisticados para o homem moderno. Experiência premium garantida.",
        rating: "5.0",
        phones: ["(11) 91234-5678"],
        imageUrl: "https://utfs.io/f/45331760-899c-4b4b-910e-e00babb6ed81-16q.png",
      },
      {
        name: "The King's Barber",
        address: "Rua Augusta, 789 - Jardins, São Paulo",
        description: "Tratamento real para todos os clientes. Excelência em cada detalhe.",
        rating: "5.0",
        phones: ["(11) 99876-5432"],
        imageUrl: "https://utfs.io/f/8a457cda-f768-4276-ad71-6688882c4512-16r.png",
      },

      // Barbearias 4.5 - 4.9 estrelas
      {
        name: "Classic Style Barber",
        address: "Rua Oscar Freire, 456 - Pinheiros, São Paulo",
        description: "Estilo clássico com toque contemporâneo. Ótimo custo-benefício.",
        rating: randomRating(4.5, 4.9),
        phones: ["(11) 97777-8888"],
        imageUrl: "https://utfs.io/f/2f9278ba-3975-4026-af46-64af78864494-16o.png",
      },
      {
        name: "Modern Cuts",
        address: "Av. Faria Lima, 1500 - Itaim Bibi, São Paulo",
        description: "Cortes modernos e tendências atuais. Ambiente descontraído.",
        rating: randomRating(4.5, 4.9),
        phones: ["(11) 96666-7777"],
        imageUrl: "https://utfs.io/f/c4919193-a675-4c47-9f21-ebd86d1c8e6a-4oen.png",
      },
      {
        name: "Urban Barber Shop",
        address: "Rua dos Pinheiros, 890 - Pinheiros, São Paulo",
        description: "Barbearia urbana com serviços completos e ambiente jovem.",
        rating: randomRating(4.5, 4.9),
        phones: ["(11) 95555-6666"],
        imageUrl: "https://utfs.io/f/10f9c9e1-5a51-46f6-accf-e6dfa5a23080-4oen.png",
      },
      {
        name: "Barber Kings",
        address: "Rua Haddock Lobo, 234 - Cerqueira César, São Paulo",
        description: "Reis do corte masculino. Atendimento de qualidade.",
        rating: randomRating(4.5, 4.9),
        phones: ["(11) 94444-5555"],
        imageUrl: "https://utfs.io/f/2f9278ba-3975-4026-af46-64af78864494-16o.png",
      },

      // Barbearias 4.0 - 4.4 estrelas
      {
        name: "Street Barber",
        address: "Rua Teodoro Sampaio, 1200 - Pinheiros, São Paulo",
        description: "Barbearia de rua com estilo autêntico e preços justos.",
        rating: randomRating(4.0, 4.4),
        phones: ["(11) 93333-4444"],
        imageUrl: "https://utfs.io/f/c97a2dc9-cf0f-4bc9-a6f3-9c1efaef1ac3-16p.png",
      },
      {
        name: "Fade Masters",
        address: "Av. Rebouças, 3000 - Pinheiros, São Paulo",
        description: "Especialistas em fade e degradê. Bom atendimento.",
        rating: randomRating(4.0, 4.4),
        phones: ["(11) 92222-3333"],
        imageUrl: "https://utfs.io/f/45331760-899c-4b4b-910e-e00babb6ed81-16q.png",
      },
      {
        name: "Bro's Barber",
        address: "Rua Mourato Coelho, 567 - Vila Madalena, São Paulo",
        description: "Ambiente fraterno e acolhedor. Cortes tradicionais.",
        rating: randomRating(4.0, 4.4),
        phones: ["(11) 91111-2222"],
        imageUrl: "https://utfs.io/f/8a457cda-f768-4276-ad71-6688882c4512-16r.png",
      },
      {
        name: "Classic Barbershop",
        address: "Rua Cardeal Arcoverde, 890 - Pinheiros, São Paulo",
        description: "Tradição em cortes masculinos. Ambiente familiar.",
        rating: randomRating(4.0, 4.4),
        phones: ["(11) 90000-1111"],
        imageUrl: "https://utfs.io/f/c4919193-a675-4c47-9f21-ebd86d1c8e6a-4oen.png",
      },

      // Barbearias 3.5 - 3.9 estrelas
      {
        name: "Quick Cuts",
        address: "Av. Brigadeiro Faria Lima, 2000 - Jardim Paulistano, São Paulo",
        description: "Cortes rápidos para o dia a dia. Atendimento ágil.",
        rating: randomRating(3.5, 3.9),
        phones: ["(11) 98888-9999"],
        imageUrl: "https://utfs.io/f/10f9c9e1-5a51-46f6-accf-e6dfa5a23080-4oen.png",
      },
      {
        name: "Express Barber",
        address: "Rua da Consolação, 2500 - Consolação, São Paulo",
        description: "Praticidade e rapidez sem frescura. Preço acessível.",
        rating: randomRating(3.5, 3.9),
        phones: ["(11) 97777-8888"],
        imageUrl: "https://utfs.io/f/2f9278ba-3975-4026-af46-64af78864494-16o.png",
      },
      {
        name: "Neighborhood Cuts",
        address: "Rua Cunha Gago, 123 - Pinheiros, São Paulo",
        description: "Barbearia de bairro com atendimento simples e honesto.",
        rating: randomRating(3.5, 3.9),
        phones: ["(11) 96666-7777"],
        imageUrl: "https://utfs.io/f/c97a2dc9-cf0f-4bc9-a6f3-9c1efaef1ac3-16p.png",
      },

      // Barbearias 3.0 - 3.4 estrelas
      {
        name: "Simple Cuts",
        address: "Av. Angélica, 1800 - Higienópolis, São Paulo",
        description: "Cortes simples e funcionais. Sem luxo, só o essencial.",
        rating: randomRating(3.0, 3.4),
        phones: ["(11) 95555-6666"],
        imageUrl: "https://utfs.io/f/45331760-899c-4b4b-910e-e00babb6ed81-16q.png",
      },
      {
        name: "Basic Barber",
        address: "Rua Bela Cintra, 1000 - Consolação, São Paulo",
        description: "Serviços básicos de barbearia. Preço baixo.",
        rating: randomRating(3.0, 3.4),
        phones: ["(11) 94444-5555"],
        imageUrl: "https://utfs.io/f/8a457cda-f768-4276-ad71-6688882c4512-16r.png",
      },

      // Barbearias novas adicionais
      {
        name: "Premium Cuts Lounge",
        address: "Rua Bela Cintra, 2100 - Consolação, São Paulo",
        description: "Lounge exclusivo com drinks e cortes premium.",
        rating: randomRating(4.7, 5.0),
        phones: ["(11) 98123-4567"],
        imageUrl: "https://utfs.io/f/c4919193-a675-4c47-9f21-ebd86d1c8e6a-4oen.png",
      },
      {
        name: "Old School Barber",
        address: "Rua Augusta, 1500 - Consolação, São Paulo",
        description: "Tradição antiga com métodos clássicos de barbear.",
        rating: randomRating(4.3, 4.6),
        phones: ["(11) 97234-5678"],
        imageUrl: "https://utfs.io/f/10f9c9e1-5a51-46f6-accf-e6dfa5a23080-4oen.png",
      },
      {
        name: "Elite Barber Studio",
        address: "Av. Europa, 890 - Jardim Europa, São Paulo",
        description: "Studio elite para clientes exigentes.",
        rating: "5.0",
        phones: ["(11) 96345-6789"],
        imageUrl: "https://utfs.io/f/2f9278ba-3975-4026-af46-64af78864494-16o.png",
      },
      {
        name: "Downtown Cuts",
        address: "Rua Sete de Abril, 230 - República, São Paulo",
        description: "Cortes urbanos no coração de São Paulo.",
        rating: randomRating(3.8, 4.2),
        phones: ["(11) 95456-7890"],
        imageUrl: "https://utfs.io/f/c97a2dc9-cf0f-4bc9-a6f3-9c1efaef1ac3-16p.png",
      },
      {
        name: "Royal Grooming",
        address: "Alameda Santos, 1200 - Jardim Paulista, São Paulo",
        description: "Grooming real para cavalheiros.",
        rating: randomRating(4.8, 5.0),
        phones: ["(11) 94567-8901"],
        imageUrl: "https://utfs.io/f/45331760-899c-4b4b-910e-e00babb6ed81-16q.png",
      },
    ];

    const barbershops = await Promise.all(
      barbershopsData.map((data) =>
        prisma.barbershop.create({
          data: {
            ...data,
            rating: parseFloat(data.rating),
          },
        })
      )
    );

    console.log(`✅ ${barbershops.length} barbearias criadas!`);

    // Criar barbeiros para cada barbearia (2 a 5 barbeiros)
    console.log("💈 Criando barbeiros...");

    const barberNames = [
      "João Silva",
      "Pedro Santos",
      "Carlos Oliveira",
      "Rafael Costa",
      "Marcos Ferreira",
      "Lucas Almeida",
      "Gabriel Rocha",
      "Felipe Martins",
      "André Souza",
      "Thiago Lima",
      "Bruno Carvalho",
      "Rodrigo Pereira",
      "Fernando Ribeiro",
      "Gustavo Dias",
      "Leonardo Mendes",
      "Diego Barbosa",
      "Vinícius Araújo",
      "Matheus Cardoso",
      "Daniel Gomes",
      "Fábio Correia",
    ];

    let barberIndex = 0;
    const allBarbers = [];

    for (const barbershop of barbershops) {
      const barberCount = Math.floor(Math.random() * 4) + 2; // 2 a 5 barbeiros

      for (let i = 0; i < barberCount; i++) {
        const barber = await prisma.barber.create({
          data: {
            name: barberNames[barberIndex % barberNames.length],
            barbershopId: barbershop.id,
            imageUrl: `https://randomuser.me/api/portraits/men/${(barberIndex % 99) + 1}.jpg`,
          },
        });
        allBarbers.push(barber);
        barberIndex++;
      }
    }

    console.log(`✅ ${allBarbers.length} barbeiros criados!`);

    // Criar serviços para cada barbearia
    console.log("✂️ Criando serviços...");

    const serviceTemplates = [
      { 
        name: "Corte de Cabelo", 
        price: 45.0,
        imageUrl: "https://utfs.io/f/c97a2dc9-cf0f-4bc9-a6f3-9c1efaef1ac3-16p.png"
      },
      { 
        name: "Barba", 
        price: 35.0,
        imageUrl: "https://utfs.io/f/45331760-899c-4b4b-910e-e00babb6ed81-16q.png"
      },
      { 
        name: "Corte + Barba", 
        price: 70.0,
        imageUrl: "https://utfs.io/f/8a457cda-f768-4276-ad71-6688882c4512-16r.png"
      },
      { 
        name: "Pézinho", 
        price: 25.0,
        imageUrl: "https://utfs.io/f/2f9278ba-3975-4026-af46-64af78864494-16o.png"
      },
      { 
        name: "Sobrancelha", 
        price: 20.0,
        imageUrl: "https://utfs.io/f/c4919193-a675-4c47-9f21-ebd86d1c8e6a-4oen.png"
      },
      { 
        name: "Hidratação Capilar", 
        price: 40.0,
        imageUrl: "https://utfs.io/f/10f9c9e1-5a51-46f6-accf-e6dfa5a23080-4oen.png"
      },
    ];

    let totalServices = 0;

    for (const barbershop of barbershops) {
      const servicesToCreate = randomItems(
        serviceTemplates,
        Math.floor(Math.random() * 3) + 4
      ); // 4 a 6 serviços

      for (const serviceTemplate of servicesToCreate) {
        await prisma.service.create({
          data: {
            name: serviceTemplate.name,
            description: `${serviceTemplate.name} profissional na ${barbershop.name}`,
            price: serviceTemplate.price,
            barbershopId: barbershop.id,
            imageUrl: serviceTemplate.imageUrl,
          },
        });
        totalServices++;
      }
    }

    console.log(`✅ ${totalServices} serviços criados!`);
    console.log("\n🎉 Seed executado com sucesso!");
    console.log(`📊 Resumo:`);
    console.log(`   - ${barbershops.length} barbearias (ratings de 3.0 a 5.0)`);
    console.log(`   - ${allBarbers.length} barbeiros`);
    console.log(`   - ${totalServices} serviços`);
  } catch (error) {
    console.error("❌ Erro ao executar seed:", error);
    throw error;
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
