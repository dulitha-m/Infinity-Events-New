const mongoose = require('mongoose');

const segmentSchema = new mongoose.Schema({
  order: { type: Number, required: true },
  icon: { type: String, required: true },
  label: { type: String, required: true },
  title: { type: String, required: true },
  sub: { type: String, required: true },
  accentColor: { type: String, default: '#FF2D78' },
  bgGradient: { type: String, default: 'linear-gradient(135deg,#1a0010,#3d0030)' },
  imageUrl: { type: String, default: '' },
  gridSpan: { type: Number, default: 4 },
  isWide: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true },
  description: { type: String, default: '' },
  details: { type: String, default: '' },
  offerings: { type: [String], default: [] },
}, { timestamps: true });

module.exports = mongoose.model('Segment', segmentSchema);
