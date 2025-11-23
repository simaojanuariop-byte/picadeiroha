import { prisma } from '../lib/db/prisma';

async function main() {
  console.log('🌱 Iniciando seed do banco de dados...');

  // Criar usuários de teste
  const user1 = await prisma.user.upsert({
    where: { email: 'cliente@test.com' },
    update: {},
    create: {
      email: 'cliente@test.com',
      name: 'João Silva',
      password: 'hashedpassword123', // Em produção, use bcryptjs
      phone: '+351 912 345 678',
      address: 'Rua Principal, 123, Porto',
      role: 'customer',
    },
  });

  const user2 = await prisma.user.upsert({
    where: { email: 'professor@test.com' },
    update: {},
    create: {
      email: 'professor@test.com',
      name: 'Maria Oliveira',
      password: 'hashedpassword123',
      phone: '+351 918 765 432',
      address: 'Av. Cavalaria, 456, Porto',
      role: 'professor',
    },
  });

  const admin = await prisma.user.upsert({
    where: { email: 'admin@test.com' },
    update: {},
    create: {
      email: 'admin@test.com',
      name: 'Admin User',
      password: 'hashedpassword123',
      phone: '+351 920 000 000',
      address: 'Quinta da Horta, Porto',
      role: 'admin',
    },
  });

  console.log('✅ Usuários criados:');
  console.log('  - Cliente:', user1.email);
  console.log('  - Professor:', user2.email);
  console.log('  - Admin:', admin.email);

  // Criar algumas reservas de teste
  const reservation1 = await prisma.reservation.create({
    data: {
      userId: user1.id,
      date: new Date(2025, 0, 25), // 25 de Janeiro de 2025
      time: '10:00',
      type: 'individual',
      horse: 'Tornado',
      level: 'iniciante',
      notes: 'Primeira aula de equitação',
      status: 'confirmed',
    },
  });

  const reservation2 = await prisma.reservation.create({
    data: {
      userId: user1.id,
      date: new Date(2025, 0, 26),
      time: '14:30',
      type: 'group',
      horse: 'Sultan',
      level: 'intermédio',
      notes: 'Aula em grupo',
      status: 'confirmed',
    },
  });

  console.log('✅ Reservas criadas:');
  console.log('  - Reserva 1:', reservation1.date.toISOString().split('T')[0], '@', reservation1.time);
  console.log('  - Reserva 2:', reservation2.date.toISOString().split('T')[0], '@', reservation2.time);

  console.log('🎉 Seed completado com sucesso!');
}

main()
  .catch((e) => {
    console.error('❌ Erro durante seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
