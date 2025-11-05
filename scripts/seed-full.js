const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function seedDatabase() {
  try {
    // Limpar dados existentes
    await prisma.booking.deleteMany({});
    await prisma.barber.deleteMany({});
    await prisma.service.deleteMany({});
    await prisma.barbershop.deleteMany({});

    console.log("Limpando dados antigos...");

    const barbershopImages = [
      "https://utfs.io/f/c97a2dc9-cf62-468b-a851-bfd2bdde775f-16p.png",
      "https://utfs.io/f/45331760-899c-4b4b-910e-e00babb6ed81-16q.png",
      "https://utfs.io/f/5832df58-cfd7-4b3f-b102-42b7e150ced2-16r.png",
      "https://utfs.io/f/7e309eaa-d722-465b-b8b6-76217404a3d3-16s.png",
      "https://utfs.io/f/178da6b6-6f9a-424a-be9d-a2feb476eb36-16t.png",
      "https://utfs.io/f/2f9278ba-3975-4026-af46-64af78864494-16u.png",
      "https://utfs.io/f/988646ea-dcb6-4f47-8a03-8d4586b7bc21-16v.png",
      "https://utfs.io/f/60f24f5c-9ed3-40ba-8c92-0cd1dcd043f9-16w.png",
      "https://utfs.io/f/f64f1bd4-59ce-4ee3-972d-2399937eeafc-16x.png",
      "https://utfs.io/f/e995db6d-df96-4658-99f5-11132fd931e1-17j.png",
    ];

    const barberImages = [
      "https://randomuser.me/api/portraits/men/1.jpg",
      "https://randomuser.me/api/portraits/men/2.jpg",
      "https://randomuser.me/api/portraits/men/3.jpg",
      "https://randomuser.me/api/portraits/men/4.jpg",
      "https://randomuser.me/api/portraits/men/5.jpg",
      "https://randomuser.me/api/portraits/men/6.jpg",
      "https://randomuser.me/api/portraits/men/7.jpg",
      "https://randomuser.me/api/portraits/men/8.jpg",
      "https://randomuser.me/api/portraits/men/9.jpg",
      "https://randomuser.me/api/portraits/men/10.jpg",
      "https://randomuser.me/api/portraits/men/11.jpg",
      "https://randomuser.me/api/portraits/men/12.jpg",
      "https://randomuser.me/api/portraits/men/13.jpg",
      "https://randomuser.me/api/portraits/men/14.jpg",
      "https://randomuser.me/api/portraits/men/15.jpg",
      "https://randomuser.me/api/portraits/men/16.jpg",
      "https://randomuser.me/api/portraits/men/17.jpg",
      "https://randomuser.me/api/portraits/men/18.jpg",
      "https://randomuser.me/api/portraits/men/19.jpg",
      "https://randomuser.me/api/portraits/men/20.jpg",
    ];

    const barbershops = [
      {
        name: "Vintage Barber",
        address: "Avenida Rio Branco, 251 - Centro, São Paulo",
        description: "A melhor barbearia vintage da cidade. Tradição e estilo desde 1950.",
      },
      {
        name: "Homem Elegante",
        address: "Rua Augusta, 1549 - Consolação, São Paulo",
        description: "Sofisticação e elegância para o homem moderno.",
      },
      {
        name: "Clássica Cortez",
        address: "Alameda Santos, 2441 - Jardins, São Paulo",
        description: "Cortes clássicos com um toque contemporâneo.",
      },
      {
        name: "Barbearia Urbana",
        address: "Rua Oscar Freire, 379 - Jardins, São Paulo",
        description: "Estilo urbano e descolado para quem não abre mão da qualidade.",
      },
      {
        name: "Estilo & Navalha",
        address: "Avenida Paulista, 1578 - Bela Vista, São Paulo",
        description: "Arte da navalha e cortes impecáveis.",
      },
      {
        name: "Barba & Bigode",
        address: "Rua da Consolação, 3564 - Consolação, São Paulo",
        description: "Especialistas em barbas e bigodes estilosos.",
      },
      {
        name: "The Gentleman's",
        address: "Rua Haddock Lobo, 1626 - Cerqueira César, São Paulo",
        description: "Para cavalheiros que apreciam o melhor.",
      },
      {
        name: "Corte Real",
        address: "Rua Bela Cintra, 1129 - Consolação, São Paulo",
        description: "Tratamento real para homens de bom gosto.",
      },
      {
        name: "Machado & Tesoura",
        address: "Rua dos Pinheiros, 498 - Pinheiros, São Paulo",
        description: "Precisão e qualidade em cada corte.",
      },
      {
        name: "Barbearia Moderna",
        address: "Avenida Rebouças, 3970 - Pinheiros, São Paulo",
        description: "Modernidade sem perder a essência tradicional.",
      },
    ];

    const barberNames = [
      "Carlos Silva", "João Santos", "Pedro Oliveira", "Lucas Souza", "Rafael Costa",
      "Bruno Lima", "Felipe Alves", "Gustavo Pereira", "Rodrigo Martins", "Diego Ferreira",
      "Marcos Ribeiro", "André Rocha", "Paulo Carvalho", "Thiago Barbosa", "Vinicius Gomes",
      "Leonardo Dias", "Eduardo Moreira", "Fernando Lopes", "Gabriel Araújo", "Ricardo Mendes",
    ];

    const services = [
      {
        name: "Corte de Cabelo",
        description: "Estilo personalizado com as últimas tendências.",
        price: 60.0,
        imageUrl: "https://utfs.io/f/0ddfbd26-a424-43a0-aaf3-c3f1dc6be6d1-1kgxo7.png",
      },
      {
        name: "Barba",
        description: "Modelagem completa para destacar sua masculinidade.",
        price: 40.0,
        imageUrl: "https://utfs.io/f/e6bdffb6-24a9-455b-aba3-903c2c2b5bde-1jo6tu.png",
      },
      {
        name: "Pézinho",
        description: "Acabamento perfeito para um visual renovado.",
        price: 35.0,
        imageUrl: "https://utfs.io/f/8a457cda-f768-411d-a737-cdb23ca6b9b5-b3pegf.png",
      },
      {
        name: "Sobrancelha",
        description: "Expressão acentuada com modelagem precisa.",
        price: 20.0,
        imageUrl: "https://utfs.io/f/2118f76e-89e4-43e6-87c9-8f157500c333-b0ps0b.png",
      },
      {
        name: "Massagem",
        description: "Relaxe com uma massagem revigorante.",
        price: 50.0,
        imageUrl: "https://utfs.io/f/c4919193-a675-4c47-9f21-ebd86d1c8e6a-4oen2a.png",
      },
      {
        name: "Hidratação",
        description: "Hidratação profunda para cabelo e barba.",
        price: 25.0,
        imageUrl: "https://utfs.io/f/8a457cda-f768-411d-a737-cdb23ca6b9b5-b3pegf.png",
      },
    ];

    console.log("Criando barbearias...");

    let barberIndex = 0;

    for (let i = 0; i < barbershops.length; i++) {
      const barbershop = await prisma.barbershop.create({
        data: {
          name: barbershops[i].name,
          address: barbershops[i].address,
          description: barbershops[i].description,
          phones: ["(11) 99999-" + String(1000 + i).padStart(4, '0'), "(11) 98888-" + String(2000 + i).padStart(4, '0')],
          imageUrl: barbershopImages[i],
        },
      });

      console.log(`✓ Barbearia criada: ${barbershop.name}`);

      // Criar serviços para a barbearia
      for (const service of services) {
        await prisma.service.create({
          data: {
            ...service,
            barbershopId: barbershop.id,
          },
        });
      }

      // Criar barbeiros (entre 2 e 5 por barbearia)
      const numberOfBarbers = Math.floor(Math.random() * 4) + 2; // 2-5 barbeiros
      
      for (let j = 0; j < numberOfBarbers; j++) {
        await prisma.barber.create({
          data: {
            name: barberNames[barberIndex % barberNames.length],
            barbershopId: barbershop.id,
            imageUrl: barberImages[barberIndex % barberImages.length],
            description: "Profissional experiente com mais de 5 anos na área.",
          },
        });
        barberIndex++;
      }

      console.log(`  ✓ ${numberOfBarbers} barbeiros adicionados`);
    }

    console.log("\n✅ Seed executado com sucesso!");
    console.log(`📊 Criadas ${barbershops.length} barbearias com barbeiros e serviços`);
  } catch (error) {
    console.error("Erro ao executar seed:", error);
  } finally {
    await prisma.$disconnect();
  }
}

seedDatabase();
