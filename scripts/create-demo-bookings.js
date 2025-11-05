const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  try {
    console.log("📅 Criando agendamentos de demonstração...");

    let user = await prisma.user.findFirst();

    if (!user) {
      console.log("👤 Criando usuário de demonstração...");
      user = await prisma.user.create({
        data: {
          email: "demo@gigiobarbearia.com",
          name: "Cliente Demo",
        },
      });
    }

    const barbershops = await prisma.barbershop.findMany({
      include: {
        services: true,
      },
      take: 5,
    });

    console.log(`👤 Usuário: ${user.name} (${user.email})`);
    console.log(`🏪 Encontradas ${barbershops.length} barbearias`);

    const bookings = [];
    const now = new Date();

    for (let i = 0; i < 3; i++) {
      const barbershop = barbershops[i % barbershops.length];
      const service = barbershop.services[0];

      if (!service) continue;

      const bookingDate = new Date(now);
      bookingDate.setDate(now.getDate() + i + 1); // Próximos 3 dias
      bookingDate.setHours(10 + i * 2, 0, 0, 0); // 10h, 12h, 14h

      const booking = await prisma.booking.create({
        data: {
          userId: user.id,
          serviceId: service.id,
          date: bookingDate,
        },
      });

      bookings.push(booking);
      console.log(
        `✅ Agendamento criado: ${barbershop.name} - ${service.name} em ${bookingDate.toLocaleString(
          "pt-BR"
        )}`
      );
    }

    console.log(`\n🎉 ${bookings.length} agendamentos criados com sucesso!`);
  } catch (error) {
    console.error("❌ Erro ao criar agendamentos:", error);
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
