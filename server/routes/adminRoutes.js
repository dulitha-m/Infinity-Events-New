const router = require('express').Router();
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const Contact = require('../models/Contact');
const auth = require('../middleware/auth');

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
    if (!admin || !(await admin.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: admin._id, email: admin.email }, process.env.JWT_SECRET, { expiresIn: '24h' });
    res.json({ token, admin: { id: admin._id, email: admin.email, name: admin.name } });
  } catch (err) { res.status(500).json({ message: err.message }); }
});

// Dashboard stats summary
router.get('/dashboard', auth, async (req, res) => {
  try {
    const [newInquiries, totalInquiries] = await Promise.all([
      Contact.countDocuments({ status: 'new' }),
      Contact.countDocuments(),
    ]);
    const recentInquiries = await Contact.find().sort({ createdAt: -1 }).limit(5);
    res.json({ newInquiries, totalInquiries, recentInquiries });
  } catch (err) { res.status(500).json({ message: err.message }); }
});

// Verify token
router.get('/verify', auth, (req, res) => res.json({ valid: true, admin: req.admin }));

module.exports = router;
