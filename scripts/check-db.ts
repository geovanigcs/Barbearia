import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function checkData() {
  try {
    const barbershops = await prisma.barbershop.count()
    const barbers = await prisma.barber.count()
    const services = await prisma.service.count()
    const users = await prisma.user.count()
    const bookings = await prisma.booking.count()

    console.log('\n📊 Dados no banco Neon:')
    console.log(`  Barbearias: ${barbershops}`)
    console.log(`  Barbeiros: ${barbers}`)
    console.log(`  Serviços: ${services}`)
    console.log(`  Usuários: ${users}`)
    console.log(`  Reservas: ${bookings}`)

    if (barbershops === 0) {
      console.log('\n⚠️  Banco vazio! Execute: npx tsx prisma/seed.ts')
    } else {
      console.log('\n✅ Banco populado com sucesso!')
    }
  } catch (error) {
    console.error('❌ Erro ao verificar dados:', error)
  } finally {
    await prisma.$disconnect()
  }
}

checkData()
