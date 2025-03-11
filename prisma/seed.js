/* eslint-disable @typescript-eslint/no-require-imports */
const axios = require("axios");
const cheerio = require("cheerio");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const urlList = [
  "https://www.youtube.com/@MrBeast",
  "https://www.youtube.com/@dudeperfect",
  "https://www.youtube.com/@PewDiePie",
  "https://www.youtube.com/@loganpaulvlogs",
  "https://www.youtube.com/@IShowSpeed",
  "https://www.youtube.com/@JakePaul",
  "https://www.youtube.com/@KSI",
  "https://www.youtube.com/@cristiano",
  "https://www.youtube.com/@Sidemen",
  "https://www.youtube.com/@StokesTwins",
  "https://www.youtube.com/@CarryMinati",
];

const scrapeProfileImage = async (url) => {
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    const imageUrl = $("link[rel='image_src']").attr("href");
    return imageUrl;
  } catch (error) {
    console.error(`Failed to fetch data for ${url}:`, error.message);
    return null;
  }
};

const generateSampleData = async () => {
  const sampleData = [];

  for (const url of urlList) {
    const channelName = url.split("@")[1]; // Extracts name from URL
    const imageUrl = await scrapeProfileImage(url);

    if (!imageUrl) continue; // Skip if no image found

    sampleData.push({
      name: channelName.replace(/([A-Z])/g, " $1").trim(), // Format name
      description: `By ${channelName}`,
      website: "http://axieinfinity.io",
      image: imageUrl,
      price: "0.03ETH",
      currentlySelling: true,
      address: "0xe81Bf5A757CB4f7F82a2F23b1e59bE45c33c5b13",
      quantity: 100,
    });
  }

  return sampleData;
};

const seedDatabase = async () => {
  console.log("Scraping YouTube data...");
  const sampleData = await generateSampleData();

  if (!sampleData.length) {
    console.error("No data to seed!");
    return;
  }

  console.log("Seeding data to the database...");
  for (const nft of sampleData) {
    await prisma.nFT.create({ data: nft });
  }

  console.log("Seeding completed!");
};

seedDatabase()
  .catch((error) => {
    console.error("Seeding failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
