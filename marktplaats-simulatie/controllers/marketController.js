const Resource = require('../models/Resource');

const getAllResources = async (req, res) => {
  try {
    const resources = await Resource.find({});
    res.json(resources);
  } catch (err) {
    res.status(500).json({ message: 'Fout bij ophalen resources' });
  }
};

const buyResource = async (req, res) => {
  const { name, amount } = req.body;

  if (!name || !amount || amount <= 0) {
    return res.status(400).json({ message: 'Ongeldige input' });
  }

  try {
    const resource = await Resource.findOne({ name });

    if (!resource) {
      return res.status(404).json({ message: 'Grondstof niet gevonden' });
    }

    if (resource.supply < amount) {
      return res.status(400).json({ message: 'Niet genoeg voorraad' });
    }

    // Pas voorraad en vraag aan
    resource.supply -= amount;
    resource.demand += amount;

    // Simpele prijslogica: verhoog prijs een beetje
    resource.price += Math.ceil(amount * 0.1);

    await resource.save();

    res.json({
      message: `Je hebt ${amount} ${name} gekocht`,
      resource,
    });

  } catch (err) {
    res.status(500).json({ message: 'Fout bij kopen', error: err.message });
  }
};

const sellResource = async (req, res) => {
  const { name, amount } = req.body;

  if (!name || !amount || amount <= 0) {
    return res.status(400).json({ message: 'Ongeldige input' });
  }

  try {
    const resource = await Resource.findOne({ name });

    if (!resource) {
      return res.status(404).json({ message: 'Grondstof niet gevonden' });
    }

    // Pas voorraad en vraag aan
    resource.supply += amount;
    resource.demand = Math.max(resource.demand - amount, 0);

    // Simpele prijslogica: prijs daalt iets bij verkoop
    resource.price = Math.max(resource.price - Math.ceil(amount * 0.05), 1);

    await resource.save();

    res.json({
      message: `Je hebt ${amount} ${name} verkocht`,
      resource,
    });

  } catch (err) {
    res.status(500).json({ message: 'Fout bij verkopen', error: err.message });
  }
};


module.exports = {
  getAllResources,
  buyResource,
  sellResource,
};

