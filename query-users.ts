import { prisma } from './lib/db/prisma';

async function main() {
  const users = await prisma.user.findMany({
    select: { id: true, email: true, name: true }
  });
  console.log(JSON.stringify(users, null, 2));
}

main().then(() => process.exit(0)).catch(e => {
  console.error(e);
  process.exit(1);
});
