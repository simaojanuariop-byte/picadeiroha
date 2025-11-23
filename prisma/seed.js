const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed do banco de dados...');

  // Clear existing data
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();
  await prisma.reservation.deleteMany();
  await prisma.content.deleteMany();
  await prisma.user.deleteMany();

  // Create admin user
  const admin = await prisma.user.create({
    data: {
      email: 'admin@phgilbertofilipe.pt',
      name: 'Administrador',
      password: 'admin123', // Hash this in production!
      phone: '932111786',
      role: 'admin',
    },
  });

  console.log('✓ Admin criado:', admin.email);

  // Create sample products
  const products = await prisma.product.createMany({
    data: [
      {
        name: 'Sela de Dressage Premium',
        description: 'Sela profissional para dressage de alto nível',
        price: 450,
        category: 'Selas',
        stock: 5,
        featured: true,
      },
      {
        name: 'Freio Português Tradicional',
        description: 'Freio artesanal segundo a tradição portuguesa',
        price: 280,
        category: 'Freios',
        stock: 12,
        featured: true,
      },
      {
        name: 'Bridão Estruturado',
        description: 'Bridão resistente para treino intenso',
        price: 150,
        category: 'Bridões',
        stock: 8,
      },
      {
        name: 'Colete de Proteção Profissional',
        description: 'Colete de segurança certificado FEI',
        price: 199,
        category: 'Equipamento Pessoal',
        stock: 3,
      },
      {
        name: 'Jaqueta de Competição',
        description: 'Jaqueta elegante para competições',
        price: 320,
        category: 'Vestuário',
        stock: 6,
      },
      {
        name: 'Kit de Higiene Equina',
        description: 'Kit completo para limpeza do cavalo',
        price: 85,
        category: 'Higiene e Cuidados',
        stock: 15,
      },
      {
        name: 'Ração Premium Horse 20kg',
        description: 'Alimentação especializada de alta qualidade',
        price: 42,
        category: 'Alimentação',
        stock: 20,
      },
      {
        name: 'Acessórios de Montagem',
        description: 'Conjunto de acessórios para sela',
        price: 125,
        category: 'Acessórios',
        stock: 10,
      },
    ],
  });

  console.log(`✓ ${products.count} produtos criados`);

  // Create sample content
  const content = await prisma.content.create({
    data: {
      slug: 'historia',
      title: 'A História do PH - Gilberto Filipe',
      content: 'Fundado em 2003, o centro equestre PH é referência em Portugal na formação de cavaleiros e na qualidade dos serviços prestados.',
    },
  });

  console.log('✓ Conteúdo criado');

  console.log('✅ Seed concluído com sucesso!');
}

main()
  .catch((e) => {
    console.error('❌ Erro no seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
