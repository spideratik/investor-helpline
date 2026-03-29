const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  // Core Info
  developer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String }, 
  images: [{ type: String }], 
  fullPlanPdf: String, // Moved inside the schema
  status: { type: String, enum: ['active', 'completed', 'pending'], default: 'active' },

  // Location & Lifestyle
  location: {
    area: { type: String, required: true },
    coordinates: { lat: Number, lng: Number },
    address: String,
    mapLink: String // Added for easy customer navigation
  },
  amenities: [String], // Added: Vital for "Inspiration" (Gym, Pool, etc.)

  // Legal & Verification
  legalStatus: {
    rajukApprovalNo: String,
    landMutationStatus: { type: String, enum: ['Pending', 'Completed'] },
    isDisputed: { type: Boolean, default: false },
    binNumber: String // Added: Business Identification for tax transparency
  },
  projectType: { type: String, enum: ['Residential', 'Commercial', 'Mixed'] },

  // Financials & ROI (The "Hook" for buyers)
  funding: {
    goalAmount: { type: Number },
    raisedAmount: { type: Number, default: 0 },
    minInvestment: { type: Number, default: 500000 },
    expectedROI: { type: Number }, // Added: Projected percentage return
  },

  inventory: {
    totalUnits: Number,
    soldUnits: { type: Number, default: 0 },
    availableUnits: Number
  },

  // Timeline Transparency
  timeline: {
    startDate: { type: Date },
    expectedHandoverDate: { type: Date },
    actualHandoverDate: { type: Date } 
  },

  // Live Progress (Builds Trust)
  currentStatus: {
    completionPercentage: { type: Number, min: 0, max: 100, default: 0 },
    currentPhase: { type: String }, 
    lastUpdated: { type: Date, default: Date.now },
    statusPhotos: [String], 
    videoTourUrl: String // Added: Video is more convincing than photos
  },

  // Proof of Achievement
  handoverData: {
    plannedDate: Date,
    actualDate: Date,
    handoverPhotos: [String],
    clientTestimonials: [{ 
      name: String, 
      comment: String,
      rating: { type: Number, min: 1, max: 5 } // Added for sorting top projects
    }],
  },

  isVerified: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Project', ProjectSchema);
