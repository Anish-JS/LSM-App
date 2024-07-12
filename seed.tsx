const { PrismaClient } = require("@prisma/client");

const database = new PrismaClient();

async function main() {
  try {
    await database.category.
  } catch (err) {
    console.log("Error seeding database categories ", err);
  } finally {
    await database.$disconnect();
  }
}
