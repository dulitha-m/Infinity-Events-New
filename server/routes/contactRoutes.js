const router = require('express').Router();
const Contact = require('../models/Contact');
const auth = require('../middleware/auth');

// Public submit
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, eventType, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ message: 'Name, email and message are required' });
    }
    const inquiry = new Contact({
      name, email, phone, eventType, message,
      ipAddress: req.ip
    });
    await inquiry.save();
    res.status(201).json({ message: 'Inquiry submitted successfully! We will contact you soon.' });
  } catch (err) { res.status(500).json({ message: err.message }); }
});

// Admin: get all inquiries
router.get('/', auth, async (req, res) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    const filter = {};
    if (status) filter.status = status;
    const inquiries = await Contact.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));
    const total = await Contact.countDocuments(filter);
    res.json({ inquiries, total, pages: Math.ceil(total / limit) });
  } catch (err) { res.status(500).json({ message: err.message }); }
});

// Admin: update status
router.patch('/:id/status', auth, async (req, res) => {
  try {
    const c = await Contact.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
    res.json(c);
  } catch (err) { res.status(400).json({ message: err.message }); }
});

// Admin: delete
router.delete('/:id', auth, async (req, res) => {
  try { await Contact.findByIdAndDelete(req.params.id); res.json({ message: 'Deleted' }); }
  catch (err) { res.status(500).json({ message: err.message }); }
});

module.exports = router;
