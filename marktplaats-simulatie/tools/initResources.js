const mongoose = require('mongoose');
require('dotenv').config();
const Resource = require('../models/Resource');

/**
 * Verbindt met de MongoDB database.
 */
const connectMongo = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Verbonden met MongoDB');
  } catch (err) {
    console.error('❌ Fout bij verbinden:', err.message);
    process.exit(1); // stop bij verbindingsfout
  }
};

/**
 * Seed data die toegevoegd wordt aan de database.
 */
const resourcesSeedData = [
  { name: 'Hout', price: 10, supply: 100, demand: 70 },
  { name: 'IJzer', price: 20, supply: 80, demand: 50 },
  { name: 'Graan', price: 5, supply: 200, demand: 120 },
];

/**
 * Vult de database met de standaard resources.
 */
const seedResources = async () => {
  try {
    await Resource.deleteMany(); // Leeg eerst de collectie
    await Resource.insertMany(resourcesSeedData);
    console.log('🌱 Resources succesvol toegevoegd!');
  } catch (err) {
    console.error('❌ Fout bij toevoegen resources:', err.message);
  }
};

/**
 * Hoofdfunctie die connectie maakt, seed uitvoert en daarna verbinding verbreekt.
 */
const main = async () => {
  await connectMongo();
  await seedResources();
  await mongoose.disconnect();
};

main();
