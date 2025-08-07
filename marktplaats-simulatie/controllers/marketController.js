const Resource = require('../models/Resource');

/**
 * Haalt alle resources op uit de database.
 * @param {Object} req 
 * @param {Object} res 
 * @returns {Promise<void>}
 */
const getAllResources = async (req, res) => {
  try {
    const resources = await Resource.find({});
    res.json(resources);
  } catch (err) {
    res.status(500).json({ message: 'Fout bij ophalen resources', error: err.message });
  }
};

/**
 * Verwerkt aankoop van een grondstof.
 * @param {Object} req 
 * @param {Object} res 
 * @returns {Promise<void>}
 */
const buyResource = async (req, res) => {
  try {
    const { name, amount } = req.body;

    if (!isValidInput(name, amount)) {
      return res.status(400).json({ message: 'Ongeldige input' });
    }

    const resource = await Resource.findOne({ name });
    if (!resource) {
      return res.status(404).json({ message: 'Grondstof niet gevonden' });
    }

    if (!hasSufficientSupply(resource, amount)) {
      return res.status(400).json({ message: 'Niet genoeg voorraad' });
    }

    updateResourceAfterPurchase(resource, amount);
    await resource.save();

    res.json({
      message: `Je hebt ${amount} ${name} gekocht`,
      resource,
    });
  } catch (err) {
    res.status(500).json({ message: 'Fout bij kopen', error: err.message });
  }
};

/**
 * Verwerkt verkoop van een grondstof.
 * @param {Object} req 
 * @param {Object} res 
 * @returns {Promise<void>}
 */
const sellResource = async (req, res) => {
  try {
    const { name, amount } = req.body;

    if (!isValidInput(name, amount)) {
      return res.status(400).json({ message: 'Ongeldige input' });
    }

    const resource = await Resource.findOne({ name });
    if (!resource) {
      return res.status(404).json({ message: 'Grondstof niet gevonden' });
    }

    updateResourceAfterSale(resource, amount);
    await resource.save();

    res.json({
      message: `Je hebt ${amount} ${name} verkocht`,
      resource,
    });
  } catch (err) {
    res.status(500).json({ message: 'Fout bij verkopen', error: err.message });
  }
};

/* ===== Helper functies ===== */

/**
 * Valideert of de input geldig is.
 * @param {string} name - Naam van de grondstof
 * @param {number} amount - Aantal te kopen/verkopen
 * @returns {boolean}
 */
const isValidInput = (name, amount) => {
  return typeof name === 'string' && name.trim() !== '' && Number.isInteger(amount) && amount > 0;
};

/**
 * Checkt of er voldoende voorraad is voor aankoop.
 * @param {Object} resource - Resource document
 * @param {number} amount - Aantal te kopen
 * @returns {boolean}
 */
const hasSufficientSupply = (resource, amount) => {
  return resource.supply >= amount;
};

/**
 * Update resource velden na aankoop.
 * @param {Object} resource - Resource document
 * @param {number} amount - Aantal gekocht
 */
const updateResourceAfterPurchase = (resource, amount) => {
  resource.supply -= amount;
  resource.demand += amount;
  resource.price += Math.ceil(amount * 0.1);
};

/**
 * Update resource velden na verkoop.
 * @param {Object} resource - Resource document
 * @param {number} amount - Aantal verkocht
 */
const updateResourceAfterSale = (resource, amount) => {
  resource.supply += amount;
  resource.demand = Math.max(resource.demand - amount, 0);
  resource.price = Math.max(resource.price - Math.ceil(amount * 0.05), 1);
};

module.exports = {
  getAllResources,
  buyResource,
  sellResource,
};
