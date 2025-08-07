const mongoose = require('mongoose');
require('dotenv').config();

/**
 * Maakt verbinding met de MongoDB database.
 * Verbindt met de URI opgegeven in de .env variabele MONGO_URI.
 * Logt succes of fout naar de console.
 *
 * @returns {Promise<void>}
 */
const connectMongo = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Verbonden met MongoDB');
  } catch (err) {
    console.error('❌ Fout bij verbinden met MongoDB:', err.message);
    // Optioneel: process.exit(1) als je bij verbindingsfout de app wil stoppen
  }
};

module.exports = connectMongo;
