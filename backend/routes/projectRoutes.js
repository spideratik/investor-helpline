const express = require('express');
const router = express.Router();
const {
  createProject,
  getAllProjects,
  getPendingProjects,
  getMyProjects,
  verifyProject,
  rejectProject,
} = require('../controllers/projectController');
const { protect, adminOnly } = require('../middleware/authMiddleware');
const multer = require('multer');

// Configure Multer for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});
const upload = multer({ storage });

// Public: Get all VERIFIED projects (investor home page)
// GET /api/projects
router.get('/', getAllProjects);

// Protected Developer: Get my own projects
// GET /api/projects/mine
router.get('/mine', protect, getMyProjects);

// Admin only: Get all PENDING projects
// GET /api/projects/pending
router.get('/pending', protect, adminOnly, getPendingProjects);

// Protected Developer: Submit a new project
// POST /api/projects/create
router.post('/create', protect, upload.array('photos', 10), createProject);

// Admin only: Verify a project
// PUT /api/projects/verify/:id
router.put('/verify/:id', protect, adminOnly, verifyProject);

// Admin only: Reject a project
// PUT /api/projects/reject/:id
router.put('/reject/:id', protect, adminOnly, rejectProject);

module.exports = router;
