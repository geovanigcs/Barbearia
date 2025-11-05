const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function seedDatabase() {
  try {
    const images = [
      "https://utfs.io/f/c97a2dc9-cf62-468b-a851-bfd2bdde775f-16p.png",
      "https://utfs.io/f/45331760-899c-4b4b-910e-e00babb6ed81-16q.png",
      "https://utfs.io/f/5832df58-cfd7-4b3f-b102-42b7e150ced2-16r.png",
      "https://utfs.io/f/7e309eaa-d722-465b-b8b6-76217404a3d3-16s.png",
      "https://utfs.io/f/178da6b6-6f9a-424a-be9d-a2feb476eb36-16t.png",
    ];

    const creativeNames = [
      "Vintage Barber",
      "Homem Elegante",
      "Clássica Cortez",
      "Barbearia Urbana",
      "Estilo & Navalha",
    ];

    const addresses = [
      "Avenida Rio Branco, 251 - São Paulo",
      "Rua Augusta, 1549 - São Paulo",
      "Alameda Santos, 2441 - São Paulo",
      "Rua Oscar Freire, 379 - São Paulo",
      "Avenida Paulista, 1578 - São Paulo",
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
    ];

    console.log("Criando barbearias...");

    for (let i = 0; i < 5; i++) {
      const barbershop = await prisma.barbershop.create({
        data: {
          name: creativeNames[i],
          address: addresses[i],
          description: `A ${creativeNames[i]} é uma barbearia moderna que combina estilo e tradição. Nossa equipe de profissionais experientes está pronta para oferecer um atendimento de qualidade.`,
          phones: ["(11) 99999-9999", "(11) 98888-8888"],
          imageUrl: images[i],
        },
      });

      for (const service of services) {
        await prisma.service.create({
          data: {
            ...service,
            barbershopId: barbershop.id,
          },
        });
      }
    }

    console.log("✅ Seed executado com sucesso!");
  } catch (error) {
    console.error("Erro ao executar seed:", error);
  } finally {
    await prisma.$disconnect();
  }
}

seedDatabase();
