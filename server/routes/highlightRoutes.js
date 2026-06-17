const router = require('express').Router();
const Highlight = require('../models/Highlight');
const auth = require('../middleware/auth');

router.get('/', async (req, res) => {
  try {
    const highlights = await Highlight.find({ isActive: true }).sort('order');
    res.json(highlights);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

router.post('/', auth, async (req, res) => {
  try {
    const h = new Highlight(req.body);
    await h.save();
    res.status(201).json(h);
  } catch (err) { res.status(400).json({ message: err.message }); }
});

router.put('/:id', auth, async (req, res) => {
  try {
    const h = await Highlight.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(h);
  } catch (err) { res.status(400).json({ message: err.message }); }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    await Highlight.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) { res.status(500).json({ message: err.message }); }
});

module.exports = router;
