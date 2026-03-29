const express = require('express');
const router = express.Router();
const { createProject, getAllProjects, verifyProject } = require('../controllers/projectController');
const { protect, adminOnly } = require('../middleware/authMiddleware');
const multer = require('multer');

// Configure Multer for image handling
const upload = multer({ dest: 'uploads/' });

// --- ROUTES ---

// 1. Public: Get all projects (Use one clean route)
// URL: GET /api/projects
router.get('/', getAllProjects);

// 2. Protected: Create a new project (For Developers)
// URL: POST /api/projects/create
router.post('/create', protect, upload.array('photos'), createProject);

// 3. Admin Only: Verify a project
// URL: PUT /api/projects/verify/:id
router.put('/verify/:id', protect, adminOnly, verifyProject);

module.exports = router;