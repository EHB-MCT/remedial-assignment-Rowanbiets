const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  price: { type: Number, required: true },
  supply: { type: Number, required: true },
  demand: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Resource', resourceSchema);
