const router = require('express').Router();
const Segment = require('../models/Segment');
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
          if (mediaUrl) {
            return resolve(decodeURIComponent(mediaUrl));
          }
        } catch (e) {}
      }
      
      try {
        const parsedUrl = new URL(inputUrl);
        const mediaUrl = parsedUrl.searchParams.get('mediaurl');
        if (mediaUrl) {
          return resolve(decodeURIComponent(mediaUrl));
        }
      } catch (e) {}
      
      resolve(inputUrl);
    }).on('error', () => {
      resolve(inputUrl);
    });
  });
}

// Public
router.get('/', async (req, res) => {
  try {
    const segments = await Segment.find({ isActive: true }).sort('order');
    res.json(segments);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

// Admin CRUD
router.post('/', auth, async (req, res) => {
  try {
    if (req.body.imageUrl) {
      req.body.imageUrl = await resolveImageUrl(req.body.imageUrl);
    }
    const seg = new Segment(req.body);
    await seg.save();
    res.status(201).json(seg);
  } catch (err) { res.status(400).json({ message: err.message }); }
});

router.put('/:id', auth, async (req, res) => {
  try {
    if (req.body.imageUrl) {
      req.body.imageUrl = await resolveImageUrl(req.body.imageUrl);
    }
    const seg = await Segment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(seg);
  } catch (err) { res.status(400).json({ message: err.message }); }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    await Segment.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) { res.status(500).json({ message: err.message }); }
});

module.exports = router;
