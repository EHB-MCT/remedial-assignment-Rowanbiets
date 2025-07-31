const Resource = require('../models/Resource');

// Simpele simulatie: pas prijs aan obv. vraag/aanbod
const runMarketSimulation = async () => {
  try {
    const resources = await Resource.find();

    for (let resource of resources) {
      // Simulatie parameters
      const { demand, supply } = resource;

      if (demand > supply) {
        resource.price += 1; // prijs omhoog
      } else if (supply > demand) {
        resource.price = Math.max(1, resource.price - 1); // prijs omlaag
      }

      // Reset vraag/aanbod langzaam
      resource.demand = Math.max(0, demand - 2);
      resource.supply = Math.max(0, supply - 1);

      await resource.save();
    }

    console.log(`[SIMULATIE] Markt geüpdatet op ${new Date().toLocaleTimeString()}`);
  } catch (err) {
    console.error('Fout in simulatie:', err.message);
  }
};

module.exports = runMarketSimulation;
