const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function check() {
  const users = await prisma.user.findMany();
  console.log('Users in DB:', users.length);
  users.forEach(u => console.log(`- ${u.email} (${u.role})`));
  const products = await prisma.product.count();
  console.log('Products in DB:', products);
  process.exit(0);
}

check();
