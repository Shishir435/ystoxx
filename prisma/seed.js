/* eslint-disable @typescript-eslint/no-require-imports */
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { sampleData: nfts } = require("../src/lib/youtube-data");
const seedNFTs = async () => {
  console.log("Seeding NFTs...");
  for (const nft of nfts) {
    await prisma.nFT.create({ data: nft });
  }
  console.log("Seeding completed!");
};

seedNFTs()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
