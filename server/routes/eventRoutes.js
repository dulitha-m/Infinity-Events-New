const router = require('express').Router();
const Event = require('../models/Event');
const auth = require('../middleware/auth');
const https = require('https');

function resolveImageUrl(inputUrl) {
  return new Promise((resolve) => {
    if (!inputUrl) return resolve(inputUrl);
    if (!inputUrl.includes('sl.bing.net') && !inputUrl.includes('bing.com/images/search')) {
      return resolve(inputUrl);
    }
    https.get(inputUrl, (res) => {
      const location = res.headers.location;
      if (location) {
        try {
          const parsedUrl = new URL(location);
          const mediaUrl = parsedUrl.searchParams.get('mediaurl');
          if (mediaUrl) return resolve(decodeURIComponent(mediaUrl));
        } catch (e) {}
      }
      resolve(inputUrl);
    }).on('error', () => resolve(inputUrl));
  });
}

// Public - get active events
router.get('/', async (req, res) => {
  try {
    const events = await Event.find({ isActive: true }).sort('order');
    res.json(events);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

// Admin CRUD
router.post('/', auth, async (req, res) => {
  try {
    if (req.body.imageUrl) req.body.imageUrl = await resolveImageUrl(req.body.imageUrl);
    const event = new Event(req.body);
    await event.save();
    res.status(201).json(event);
  } catch (err) { res.status(400).json({ message: err.message }); }
});

router.put('/:id', auth, async (req, res) => {
  try {
    if (req.body.imageUrl) req.body.imageUrl = await resolveImageUrl(req.body.imageUrl);
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(event);
  } catch (err) { res.status(400).json({ message: err.message }); }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) { res.status(500).json({ message: err.message }); }
});

module.exports = router;
