const { PrismaClient } = require("@prisma/client");
const { faker } = require("@faker-js/faker");

const prisma = new PrismaClient();

// Função para gerar rating aleatório entre min e max
function randomRating(min: number, max: number): string {
  return (Math.random() * (max - min) + min).toFixed(1);
}

  // Helper para pegar itens aleatórios
  function randomItems<T>(items: T[], count: number): T[] {
    const shuffled = [...items].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
  }

  // Especialidades variadas para barbeiros
  const specialties = [
    "Especialista em Degradê",
    "Mestre das Barbas",
    "Cortes Clássicos",
    "Cortes Modernos",
    "Especialista em Pézinho",
    "Designer de Sobrancelhas",
    "Especialista em Fade",
    "Cortes Executivos",
    "Barba e Bigode",
    "Hair Tattoo",
    "Coloração Masculina",
    "Tratamentos Capilares",
    "Cortes Infantis",
    "Estilos Urbanos",
    "Navalha Tradicional",
  ];

  // Horários de trabalho variados
  const workingHours = [
    "Seg-Sex: 9h-18h",
    "Seg-Sáb: 10h-20h",
    "Ter-Sáb: 8h-17h",
    "Qua-Dom: 12h-21h",
    "Seg-Sex: 14h-22h",
    "Ter-Sex: 9h-19h, Sáb: 9h-15h",
    "Seg-Sáb: 8h-18h",
    "Qua-Seg: 10h-19h",
    "Seg-Sex: 10h-20h, Sáb: 10h-16h",
    "Ter-Dom: 11h-20h",
  ];async function seedDatabase() {
  try {
    console.log("🧹 Limpando banco de dados...");
    await prisma.booking.deleteMany({});
    await prisma.service.deleteMany({});
    await prisma.barber.deleteMany({});
    await prisma.barbershop.deleteMany({});
    await prisma.user.deleteMany({});

    console.log("🏪 Criando barbearias com ratings variados...");

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
      "https://utfs.io/f/3bcf33fc-988a-462b-8b98-b811ee2bbd71-17k.png",
      "https://utfs.io/f/5788be0e-2307-4bb4-b603-d9dd237950a2-17l.png",
      "https://utfs.io/f/6b0888f8-b69f-4be7-a13b-52d1c0c9cab2-17m.png",
      "https://utfs.io/f/ef45effa-415e-416d-8c4a-3221923cd10f-17n.png",
      "https://utfs.io/f/a55f0f39-31a0-4819-8796-538d68cc2a0f-17o.png",
      "https://utfs.io/f/5c89f046-80cd-4443-89df-211de62b7c2a-17p.png",
      "https://utfs.io/f/23d9c4f7-8bdb-40e1-99a5-f42271b7404a-17q.png",
      "https://utfs.io/f/9f0847c2-d0b8-4738-a673-34ac2b9506ec-17r.png",
      "https://utfs.io/f/07842cfb-7b30-4fdc-accc-719618dfa1f2-17s.png",
      "https://utfs.io/f/0522fdaf-0357-4213-8f52-1d83c3dcb6cd-18e.png",
    ];

    const barbershopsData = [
      // Barbearias 5.0 estrelas (Recomendadas)
      {
        name: "Vintage Barber",
        address: "Rua da Consolação, 1234 - Consolação, São Paulo",
        description:
          "A Vintage Barber é mais do que uma barbearia, é uma experiência nostálgica que remete aos clássicos salões dos anos 50. Com decoração retrô autêntica, poltronas de couro genuíno e um ambiente que respira história, oferecemos serviços premium de alta qualidade. Nossos profissionais são mestres em cortes clássicos e modernos, barbas esculpidas com navalha e tratamentos exclusivos. Cada cliente é tratado como um cavalheiro, com atenção aos mínimos detalhes. Desfrute de uma bebida cortesia enquanto relaxa ao som de jazz clássico.",
        rating: "5.0",
        phones: ["(11) 98765-4321", "(11) 3456-7890"],
      },
      {
        name: "Gentleman's Cut",
        address: "Av. Paulista, 2500 - Bela Vista, São Paulo",
        description:
          "No coração da Paulista, o Gentleman's Cut redefine o conceito de barbearia moderna. Combinamos técnicas tradicionais com as últimas tendências internacionais para criar looks sofisticados e personalizados. Nossa equipe altamente qualificada participa regularmente de workshops internacionais para trazer o que há de mais moderno em cortes masculinos. O ambiente elegante e contemporâneo proporciona uma experiência premium, com serviço de café gourmet e drinks. Aqui, cada corte é uma obra de arte.",
        rating: "5.0",
        phones: ["(11) 91234-5678"],
      },
      {
        name: "The King's Barber",
        address: "Rua Augusta, 789 - Jardins, São Paulo",
        description:
          "The King's Barber oferece tratamento digno de realeza para todos os clientes. Localizado no refinado bairro dos Jardins, nosso espaço combina luxo e conforto em cada detalhe. Especializados em barbas esculturais e cortes de precisão milimétrica, utilizamos apenas produtos premium importados. Nossa filosofia é simples: excelência em cada serviço, atenção personalizada e um ambiente que transmite status e sofisticação. Oferecemos serviços de hot towel, massagens relaxantes e consultoria de estilo sem custo adicional.",
        rating: "5.0",
        phones: ["(11) 99876-5432"],
      },
      {
        name: "Elite Barber Studio",
        address: "Av. Europa, 890 - Jardim Europa, São Paulo",
        description:
          "O Elite Barber Studio é o destino preferido dos homens mais exigentes de São Paulo. Nosso estúdio boutique oferece privacidade, exclusividade e serviços incomparáveis. Com agendamento personalizado e consultoria de imagem completa, transformamos cada visita em uma experiência única. Utilizamos as melhores ferramentas profissionais do mercado e produtos orgânicos de alta performance. Nossa equipe de elite é formada por barbeiros premiados nacionalmente, garantindo resultados impecáveis a cada corte.",
        rating: "5.0",
        phones: ["(11) 96345-6789"],
      },

      // Barbearias 4.5 - 4.9 estrelas
      {
        name: "Classic Style Barber",
        address: "Rua Oscar Freire, 456 - Pinheiros, São Paulo",
        description:
          "Na Classic Style Barber, unimos o melhor dos dois mundos: a tradição dos cortes clássicos com toques contemporâneos que valorizam sua personalidade. Nosso espaço acolhedor em Pinheiros é frequentado por quem busca qualidade e bom custo-benefício. Com mais de 10 anos de tradição, nossa equipe domina técnicas de fade, degradê e estilos modernos. Oferecemos ambiente climatizado, música ambiente agradável e produtos de qualidade premium a preços justos.",
        rating: randomRating(4.5, 4.9),
        phones: ["(11) 97777-8888"],
      },
      {
        name: "Modern Cuts",
        address: "Av. Faria Lima, 1500 - Itaim Bibi, São Paulo",
        description:
          "Modern Cuts é sinônimo de inovação e estilo urbano. Localizado na agitada Faria Lima, trazemos as últimas tendências do mundo da moda masculina diretamente para sua cabeça. Nosso ambiente descontraído e jovem é perfeito para quem valoriza cortes modernos e ousados. Especializados em hair tattoo, cortes texturizados e coloração masculina, estamos sempre um passo à frente. Wi-Fi gratuito, drinks e um atendimento descomplicado fazem parte da experiência.",
        rating: randomRating(4.5, 4.9),
        phones: ["(11) 96666-7777"],
      },
      {
        name: "Urban Barber Shop",
        address: "Rua dos Pinheiros, 890 - Pinheiros, São Paulo",
        description:
          "A Urban Barber Shop representa o estilo de vida urbano contemporâneo. Com decoração industrial e vibe moderna, nosso espaço é ideal para homens que vivem intensamente a cidade. Oferecemos serviços completos: cortes, barbas, tratamentos capilares e estética facial masculina. Nossa equipe jovem e talentosa está sempre antenada nas últimas tendências das ruas de São Paulo, Londres e Nova York. Aceite um café artesanal e relaxe ao som de playlists cuidadosamente selecionadas.",
        rating: randomRating(4.5, 4.9),
        phones: ["(11) 95555-6666"],
      },
      {
        name: "Barber Kings",
        address: "Rua Haddock Lobo, 234 - Cerqueira César, São Paulo",
        description:
          "Os reis do corte masculino! Na Barber Kings, cada cliente é tratado como majestade. Nossa missão é proporcionar não apenas um corte, mas uma experiência completa de bem-estar e autoestima. Com profissionais experientes e ambiente acolhedor, dominamos desde cortes sociais executivos até estilos mais despojados. Produtos de alta qualidade, atendimento atencioso e preços honestos são nossa marca registrada. Aqui você encontra tradição, qualidade e um tratamento que faz jus ao nosso nome.",
        rating: randomRating(4.5, 4.9),
        phones: ["(11) 94444-5555"],
      },
      {
        name: "Premium Cuts Lounge",
        address: "Rua Bela Cintra, 2100 - Consolação, São Paulo",
        description:
          "Premium Cuts Lounge eleva a experiência de barbearia a outro nível. Mais do que cortes, oferecemos momentos de puro relaxamento em nosso lounge exclusivo. Enquanto aguarda ou após seu serviço, desfrute de nossa seleção de drinks premium, cafés especiais e petiscos gourmet. Nossa equipe é treinada nas melhores escolas de barbering, garantindo técnica impecável e acabamento perfeito. O ambiente sofisticado com poltronas massageadoras e música ambiente cria a atmosfera perfeita para desconectar da rotina.",
        rating: randomRating(4.7, 5.0),
        phones: ["(11) 98123-4567"],
      },
      {
        name: "Old School Barber",
        address: "Rua Augusta, 1500 - Consolação, São Paulo",
        description:
          "Old School Barber é uma homenagem à tradição antiga do ofício de barbeiro. Aqui preservamos métodos clássicos que resistiram ao tempo: barbear com navalha tradicional, toalhas quentes e massagens faciais relaxantes. Nosso espaço remete aos antigos salões de barbeiro, onde homens se reuniam para conversar e cuidar da aparência. Cada serviço é executado com calma e dedicação, sem pressa, exatamente como era feito décadas atrás. Uma viagem no tempo com resultados contemporâneos.",
        rating: randomRating(4.3, 4.6),
        phones: ["(11) 97234-5678"],
      },
      {
        name: "Royal Grooming",
        address: "Alameda Santos, 1200 - Jardim Paulista, São Paulo",
        description:
          "Royal Grooming é o templo do grooming masculino de luxo. Especializados em cuidados completos para cavalheiros modernos, oferecemos desde cortes e barbas até tratamentos faciais anti-idade e spa capilar. Nossos profissionais são experts em grooming, com certificações internacionais e domínio de técnicas exclusivas. O ambiente refinado, com acabamentos em madeira nobre e iluminação pensada, proporciona total privacidade e conforto. Cada detalhe é pensado para oferecer uma experiência sensorial completa.",
        rating: randomRating(4.8, 5.0),
        phones: ["(11) 94567-8901"],
      },

      // Barbearias 4.0 - 4.4 estrelas
      {
        name: "Street Barber",
        address: "Rua Teodoro Sampaio, 1200 - Pinheiros, São Paulo",
        description:
          "Street Barber nasceu das ruas e para as ruas. Com espírito autêntico e sem frescuras, oferecemos cortes de qualidade a preços justos. Nossa vibe é descontraída, nossa equipe é família e nossos clientes são parceiros. Especializados em cortes urbanos, fade e estilos que refletem a cultura das ruas, trazemos autenticidade em cada serviço. Sem luxo desnecessário, apenas habilidade pura, bom papo e resultados que falam por si.",
        rating: randomRating(4.0, 4.4),
        phones: ["(11) 93333-4444"],
      },
      {
        name: "Fade Masters",
        address: "Av. Rebouças, 3000 - Pinheiros, São Paulo",
        description:
          "Como o nome diz, somos mestres em fade e degradê. Nossos barbeiros dominam todos os tipos de fade: low, mid, high, skin fade, taper e muito mais. Com técnica apurada e olhar artístico, transformamos cada corte em uma obra de arte. Além de fades impecáveis, oferecemos acabamentos precisos, desenhos e finalizações perfeitas. Bom atendimento, ambiente limpo e organizado, música boa e profissionais que realmente entendem do negócio.",
        rating: randomRating(4.0, 4.4),
        phones: ["(11) 92222-3333"],
      },
      {
        name: "Bro's Barber",
        address: "Rua Mourato Coelho, 567 - Vila Madalena, São Paulo",
        description:
          "Bro's Barber é o point dos brothers na Vila Madalena. Ambiente fraterno e acolhedor onde você se sente em casa. Nosso foco são cortes tradicionais bem executados, barbas bem feitas e um atendimento que te faz voltar. Aqui não tem frescura, tem respeito, qualidade e um preço que cabe no bolso. Curte um som, bate um papo e sai renovado. É assim que a gente trabalha: com coração, dedicação e muito talento.",
        rating: randomRating(4.0, 4.4),
        phones: ["(11) 91111-2222"],
      },
      {
        name: "Classic Barbershop",
        address: "Rua Cardeal Arcoverde, 890 - Pinheiros, São Paulo",
        description:
          "A Classic Barbershop é tradição em cortes masculinos há mais de 15 anos. Ambiente familiar, atendimento personalizado e profissionais experientes fazem parte do nosso DNA. Aqui você encontra desde cortes sociais clássicos até estilos mais modernos, sempre executados com carinho e atenção aos detalhes. Nossos clientes são tratados como parte da família, e muitos nos acompanham há anos. Venha conhecer uma barbearia onde tradição e qualidade caminham juntas.",
        rating: randomRating(4.0, 4.4),
        phones: ["(11) 90000-1111"],
      },
      {
        name: "Downtown Cuts",
        address: "Rua Sete de Abril, 230 - República, São Paulo",
        description:
          "Localizada no centro histórico de São Paulo, a Downtown Cuts traz cortes urbanos para o coração da cidade. Nossa barbearia atende o perfil dinâmico de quem trabalha e vive o downtown: rápido, eficiente e com qualidade. Especializados em cortes executivos e estilos modernos, oferecemos serviço ágil sem comprometer o resultado. Ideal para quem tem agenda corrida mas não abre mão de estar bem cuidado. Horário estendido para atender sua rotina.",
        rating: randomRating(3.8, 4.2),
        phones: ["(11) 95456-7890"],
      },

      // Barbearias 3.5 - 3.9 estrelas
      {
        name: "Quick Cuts",
        address: "Av. Brigadeiro Faria Lima, 2000 - Jardim Paulistano, São Paulo",
        description:
          "Quick Cuts é a solução para quem precisa de um corte rápido e bem feito. Nosso sistema de atendimento ágil garante que você não perca tempo, mas sem comprometer a qualidade. Perfeito para o dia a dia corrido, oferecemos cortes práticos, barbas rápidas e acabamentos. Ambiente limpo, sem frescuras e foco total em eficiência. Para quem valoriza tempo sem abrir mão de sair bem apresentado.",
        rating: randomRating(3.5, 3.9),
        phones: ["(11) 98888-9999"],
      },
      {
        name: "Express Barber",
        address: "Rua da Consolação, 2500 - Consolação, São Paulo",
        description:
          "Express Barber é praticidade e rapidez sem enrolação. Atendemos quem tem pressa mas quer ficar bem. Nossos serviços são diretos ao ponto: corte, barba, acabamento. Preço acessível, ambiente simples e funcional. Não oferecemos luxo, oferecemos o essencial bem feito. Ideal para manutenção rápida do visual sem gastar muito tempo ou dinheiro.",
        rating: randomRating(3.5, 3.9),
        phones: ["(11) 97777-8888"],
      },
      {
        name: "Neighborhood Cuts",
        address: "Rua Cunha Gago, 123 - Pinheiros, São Paulo",
        description:
          "Somos a barbearia do bairro, aquela de confiança onde todo mundo conhece todo mundo. Atendimento simples, honesto e sem enganação. Nossos preços são justos e nosso trabalho é feito com dedicação. Não temos luxo, mas temos carinho no que fazemos. Uma barbearia tradicional de bairro, onde você é sempre bem-vindo e sai satisfeito. Venha fazer parte da nossa comunidade.",
        rating: randomRating(3.5, 3.9),
        phones: ["(11) 96666-7777"],
      },

      // Barbearias 3.0 - 3.4 estrelas
      {
        name: "Simple Cuts",
        address: "Av. Angélica, 1800 - Higienópolis, São Paulo",
        description:
          "Simple Cuts oferece exatamente o que o nome diz: cortes simples e funcionais. Sem luxo, sem frescura, apenas o essencial. Para quem busca um corte básico a preço acessível, somos a escolha certa. Ambiente simples, atendimento direto e serviço que cumpre o prometido. Nada mais, nada menos. Perfeito para quem valoriza simplicidade e economia.",
        rating: randomRating(3.0, 3.4),
        phones: ["(11) 95555-6666"],
      },
      {
        name: "Basic Barber",
        address: "Rua Bela Cintra, 1000 - Consolação, São Paulo",
        description:
          "Basic Barber é para quem procura serviços básicos de barbearia sem gastar muito. Oferecemos cortes tradicionais, barbas simples e acabamentos. Nosso foco é preço baixo e atendimento rápido. O ambiente é modesto, mas limpo e organizado. Ideal para quem está no orçamento apertado mas precisa manter o visual em dia. Aceitamos todos sem distinção.",
        rating: randomRating(3.0, 3.4),
        phones: ["(11) 94444-5555"],
      },
    ];

    const barbershops = await Promise.all(
      barbershopsData.map((data, index) =>
        prisma.barbershop.create({
          data: {
            ...data,
            rating: parseFloat(data.rating),
            imageUrl: barbershopImages[index % barbershopImages.length],
          },
        })
      )
    );

    console.log(`✅ ${barbershops.length} barbearias criadas!`);

    // Criar barbeiros para cada barbearia (2 a 5 barbeiros)
    console.log("💈 Criando barbeiros...");

    let barberIndex = 0;
    const allBarbers = [];

    for (const barbershop of barbershops) {
      const barberCount = Math.floor(Math.random() * 4) + 2; // 2 a 5 barbeiros

      for (let i = 0; i < barberCount; i++) {
        const randomSpecialty =
          specialties[Math.floor(Math.random() * specialties.length)];
        const randomHours =
          workingHours[Math.floor(Math.random() * workingHours.length)];

        const barber = await prisma.barber.create({
          data: {
            name: faker.person.fullName({ sex: "male" }),
            specialty: randomSpecialty,
            workingHours: randomHours,
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
            description: serviceTemplate.description,
            price: serviceTemplate.price,
            barbershopId: barbershop.id,
            imageUrl: serviceTemplate.imageUrl,
          },
        });
        totalServices++;
      }
    }

    console.log(`✅ ${totalServices} serviços criados!`);

    // Criar usuário demo e agendamentos
    console.log("👤 Criando usuário demo e agendamentos...");

    const demoUser = await prisma.user.create({
      data: {
        email: "demo@gigiobarbearia.com",
        name: "Cliente Demo",
      },
    });

    const bookings = [];
    const now = new Date();

    for (let i = 0; i < 3; i++) {
      const barbershop = barbershops[i % barbershops.length];
      const services = await prisma.service.findMany({
        where: { barbershopId: barbershop.id },
        take: 1,
      });

      if (services.length === 0) continue;

      const bookingDate = new Date(now);
      bookingDate.setDate(now.getDate() + i + 1); // Próximos 3 dias
      bookingDate.setHours(10 + i * 2, 0, 0, 0); // 10h, 12h, 14h

      const booking = await prisma.booking.create({
        data: {
          userId: demoUser.id,
          serviceId: services[0].id,
          date: bookingDate,
        },
      });

      bookings.push(booking);
    }

    console.log(`✅ ${bookings.length} agendamentos criados!`);

    console.log("\n🎉 Seed executado com sucesso!");
    console.log(`📊 Resumo:`);
    console.log(`   - ${barbershops.length} barbearias (ratings de 3.0 a 5.0)`);
    console.log(`   - ${allBarbers.length} barbeiros`);
    console.log(`   - ${totalServices} serviços`);
    console.log(`   - 1 usuário demo`);
    console.log(`   - ${bookings.length} agendamentos`);

    await prisma.$disconnect();
  } catch (error) {
    console.error("Erro ao criar as barbearias:", error);
    await prisma.$disconnect();
    process.exit(1);
  }
}

seedDatabase();