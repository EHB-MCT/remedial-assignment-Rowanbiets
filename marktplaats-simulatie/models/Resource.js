const mongoose = require('mongoose');

/**
 * Schema voor grondstof (Resource).
 * 
 * Velden:
 * - name: Unieke naam van de grondstof (String, verplicht)
 * - price: Prijs per eenheid (Number, verplicht)
 * - supply: Hoeveelheid beschikbaar (Number, verplicht)
 * - demand: Vraag naar de grondstof (Number, verplicht)
 * 
 * Timestamps worden automatisch toegevoegd (createdAt, updatedAt).
 */
const resourceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  supply: {
    type: Number,
    required: true,
    min: 0,
  },
  demand: {
    type: Number,
    required: true,
    min: 0,
  }
}, { timestamps: true });

module.exports = mongoose.model('Resource', resourceSchema);
