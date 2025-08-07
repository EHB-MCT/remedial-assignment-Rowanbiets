const mongoose = require('mongoose');
require('dotenv').config();
const Resource = require('../models/Resource');

const connectMongo = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Verbonden met MongoDB');
  } catch (err) {
    console.error('❌ Fout bij verbinden:', err.message);
  }
};

const seedResources = async () => {
  await connectMongo();

  const resources = [
    { name: 'Hout', price: 10, supply: 100, demand: 70 },
    { name: 'IJzer', price: 20, supply: 80, demand: 50 },
    { name: 'Graan', price: 5, supply: 200, demand: 120 }
  ];

  try {
    await Resource.deleteMany(); 
    await Resource.insertMany(resources);
    console.log('🌱 Resources succesvol toegevoegd!');
  } catch (err) {
    console.error('❌ Fout bij toevoegen resources:', err.message);
  } finally {
    mongoose.disconnect();
  }
};

seedResources();
