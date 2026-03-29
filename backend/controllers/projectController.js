const Project = require('../models/project'); // Match your filename case

// CREATE PROJECT: Professional Developer Mode
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
      customizationOptions
    } = req.body;

    const newProject = new Project({
      developer: req.user.id, // Linking to the logged-in Developer
      title,
      description,
      
      // Location Details
      location: { 
        area, 
        address 
      },
      
      // 4. Legal Compliance
      legalStatus: { 
        rajukApprovalNo, 
        landMutationStatus 
      },
      
      // 5. Financial Terms & Pricing
      funding: {
        goalAmount,
        minInvestment
      },

      projectType,

      // 3. Transparency & 2. Quality Track Record
      currentStatus: { 
        completionPercentage,
        currentPhase 
      },
      
      handoverData: { 
        plannedDate: plannedHandoverDate 
      },

      // 6. Flexibility & Customization
      customizationOptions,
      
      status: 'pending' // Default until Admin verifies
    });

    await newProject.save();
    res.status(201).json({ 
      message: "Project submitted successfully! Our team will verify the RAJUK approval shortly.", 
      project: newProject 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET ALL: Showing the Reputation and Track Record
exports.getAllProjects = async (req, res) => {
  try {
    // We 'populate' developer to show their Name and Email (Reputation)
    const projects = await Project.find()
      .populate('developer', 'name email')
      .sort({ createdAt: -1 }); // Newest projects first
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ADMIN VERIFY: Closing the Trust Loop
exports.verifyProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(
      req.params.id, 
      { status: 'active', isVerified: true }, 
      { new: true }
    );
    res.json({ message: "Project verified and live for investors!", project });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};