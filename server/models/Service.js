const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  order: { type: Number, required: true },
  name: { type: String, required: true },
  description: { type: String, default: '' },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('Service', serviceSchema);
