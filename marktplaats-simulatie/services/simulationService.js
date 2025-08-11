const Resource = require('../models/Resource');

/**
 * Voert een simpele markt simulatie uit door prijzen aan te passen
 * op basis van vraag en aanbod. Daarnaast worden vraag en aanbod
 * langzaam gereset om fluctuaties te simuleren.
 */
const runMarketSimulation = async () => {
  try {
    const resources = await Resource.find();

    for (const resource of resources) {
      const { demand, supply } = resource;

      // Pas prijs aan: stijgt als vraag > aanbod, daalt anders
      if (demand > supply) {
        resource.price += 1;
      } else if (supply > demand) {
        resource.price = Math.max(1, resource.price - 1);
      }

      // Reset vraag en aanbod geleidelijk
      resource.demand = Math.max(0, demand - 2);
      resource.supply = Math.max(0, supply - 1);

      await resource.save();
    }

    console.log(`[SIMULATIE] Markt geüpdatet op ${new Date().toLocaleTimeString()}`);
  } catch (err) {
    console.error('❌ Fout in simulatie:', err.message);
  }
};

module.exports = runMarketSimulation;
