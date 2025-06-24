const mongoose = require('mongoose');
require('dotenv').config();

const connectMongo = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Verbonden met MongoDB');
  } catch (err) {
    console.error('❌ Fout bij verbinden met MongoDB:', err.message);
  }
};

module.exports = connectMongo;
