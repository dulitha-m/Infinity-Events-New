const router = require('express').Router();
const Stats = require('../models/Stats');
const auth = require('../middleware/auth');

router.get('/', async (req, res) => {
  try {
    const stats = await Stats.find({ isActive: true }).sort('order');
    res.json(stats);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

router.post('/', auth, async (req, res) => {
  try { const s = new Stats(req.body); await s.save(); res.status(201).json(s); }
  catch (err) { res.status(400).json({ message: err.message }); }
});

router.put('/:id', auth, async (req, res) => {
  try {
    const s = await Stats.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(s);
  } catch (err) { res.status(400).json({ message: err.message }); }
});

router.delete('/:id', auth, async (req, res) => {
  try { await Stats.findByIdAndDelete(req.params.id); res.json({ message: 'Deleted' }); }
  catch (err) { res.status(500).json({ message: err.message }); }
});

module.exports = router;
