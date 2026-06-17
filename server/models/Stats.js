const mongoose = require('mongoose');

const statsSchema = new mongoose.Schema({
  label: { type: String, required: true },
  value: { type: String, required: true },
  suffix: { type: String, default: '+' },
  order: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('Stats', statsSchema);
