const mongoose = require('mongoose');

const highlightSchema = new mongoose.Schema({
  year: { type: String, required: true },
  tag: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String },
  accentColor: { type: String, default: '#FF2D78' },
  bgGradient: { type: String, default: 'linear-gradient(135deg,#FF2D78,#9B30FF)' },
  isActive: { type: Boolean, default: true },
  order: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Highlight', highlightSchema);
