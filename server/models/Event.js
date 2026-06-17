const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  order:       { type: Number, default: 0 },
  title:       { type: String, required: true },
  artist:      { type: String, default: '' },
  date:        { type: String, required: true },
  location:    { type: String, required: true },
  category:    { type: String, default: 'Live Concert' },
  description: { type: String, default: '' },
  imageUrl:    { type: String, default: '' },
  accentColor: { type: String, default: '#FFB800' },
  ticketUrl:   { type: String, default: '' },
  isFeatured:  { type: Boolean, default: false },
  isActive:    { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('Event', eventSchema);
