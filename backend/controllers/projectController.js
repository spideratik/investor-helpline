const Project = require('../models/Project'); // Fixed: correct filename case

// CREATE PROJECT: Developer submits a new project
exports.createProject = async (req, res) => {
  try {
    const {
      title,
      description,
      area,
      address,
      rajukApprovalNo,
      landMutationStatus,
      projectType,
      goalAmount,
      minInvestment,
      completionPercentage,
      currentPhase,
      plannedHandoverDate,
    } = req.body;

    // Handle uploaded photo file paths from multer
    const photoPaths = req.files ? req.files.map(f => f.path) : [];

    const newProject = new Project({
      developer: req.user.id,
      title,
      description,
      images: photoPaths,
      location: { area, address },
      legalStatus: { rajukApprovalNo, landMutationStatus },
      funding: { goalAmount, minInvestment },
      projectType,
      currentStatus: { completionPercentage, currentPhase },
      handoverData: { plannedDate: plannedHandoverDate },
      transactionId,
      status: 'pending',
      isVerified: false,
    });

    await newProject.save();
    res.status(201).json({
      message: "Project submitted! Our team will verify the RAJUK approval shortly.",
      project: newProject
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET ALL VERIFIED PROJECTS (for investors on home page)
exports.getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find({ isVerified: true })
      .populate('developer', 'username email')
      .sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET PENDING PROJECTS (admin only)
exports.getPendingProjects = async (req, res) => {
  try {
    const projects = await Project.find({ isVerified: false })
      .populate('developer', 'username email')
      .sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET DEVELOPER'S OWN PROJECTS
exports.getMyProjects = async (req, res) => {
  try {
    const projects = await Project.find({ developer: req.user.id }).sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ADMIN VERIFY: Approve a project
exports.verifyProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      { status: 'active', isVerified: true },
      { new: true }
    );
    if (!project) return res.status(404).json({ message: "Project not found" });
    res.json({ message: "Project verified and now live for investors!", project });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ADMIN REJECT: Reject a project
exports.rejectProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      { transactionId,
      status: 'pending', isVerified: false, rejectionReason: req.body.reason },
      { new: true }
    );
    if (!project) return res.status(404).json({ message: "Project not found" });
    res.json({ message: "Project rejected.", project });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DEVELOPER: Update their own project
exports.updateProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });

    // Make sure only the owner can update
    if (project.developer.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to edit this project' });
    }

    const {
      title, description, area, address,
      rajukApprovalNo, landMutationStatus,
      projectType, goalAmount, minInvestment,
      completionPercentage, currentPhase, plannedHandoverDate,
    } = req.body;

    // When a developer edits, reset to pending for re-verification
    const updated = await Project.findByIdAndUpdate(
      req.params.id,
      {
        title, description, projectType,
        location: { area, address },
        legalStatus: { rajukApprovalNo, landMutationStatus },
        funding: { goalAmount, minInvestment },
        currentStatus: { completionPercentage, currentPhase },
        handoverData: { plannedDate: plannedHandoverDate },
        transactionId,
      status: 'pending',
        isVerified: false, // Needs re-verification after edit
      },
      { new: true }
    );

    res.json({ message: 'Project updated and sent for re-verification.', project: updated });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
