const router = require('express').Router();
const Service = require('../models/Service');
const auth = require('../middleware/auth');

router.get('/', async (req, res) => {
  try {
    const services = await Service.find({ isActive: true }).sort('order');
    res.json(services);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

router.post('/', auth, async (req, res) => {
  try {
    const svc = new Service(req.body);
    await svc.save();
    res.status(201).json(svc);
  } catch (err) { res.status(400).json({ message: err.message }); }
});

router.put('/:id', auth, async (req, res) => {
  try {
    const svc = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(svc);
  } catch (err) { res.status(400).json({ message: err.message }); }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    await Service.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) { res.status(500).json({ message: err.message }); }
});

module.exports = router;
