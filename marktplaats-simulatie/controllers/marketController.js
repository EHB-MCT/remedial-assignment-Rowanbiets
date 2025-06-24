const Resource = require('../models/Resource');

const getAllResources = async (req, res) => {
  try {
    const resources = await Resource.find({});
    res.json(resources);
  } catch (err) {
    res.status(500).json({ message: 'Fout bij ophalen resources' });
  }
};

module.exports = { getAllResources };
