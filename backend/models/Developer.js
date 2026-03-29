const mongoose = require('mongoose');

const DeveloperSchema = new mongoose.Schema({
  companyName: { type: String, required: true, trim: true },
  registrationDetails: {
    rehabID: { type: String, required: true, unique: true }, // Crucial for Dhaka
    tradeLicense: { type: String, required: true },
    tinNumber: { type: String },
  },
  contact: {
    officeAddress: String,
    phone: { type: String, required: true },
    email: { type: String, required: true },
    website: String,
  },
  portfolioSummary: {
    totalProjectsHandedOver: { type: Number, default: 0 },
    yearsInMarket: { type: Number },
    averageDelayMonths: { type: Number, default: 0 }, // Transparency metric
  },
  isVerified: { type: Boolean, default: false }, // Admin-controlled
  logo: String,
}, { timestamps: true });

module.exports = mongoose.model('Developer', DeveloperSchema);

// Example logic inside the controller when fetching a developer
const calculateScore = (dev) => {
  let score = 0;
  if (dev.isVerified) score += 40;
  
  // High score for on-time handovers
  const onTimeRatio = dev.portfolioSummary.totalProjectsHandedOver > 0 ? 40 : 0;
  score += onTimeRatio;

  // Points for transparency (updates)
  score += 20; 
  
  return score;
};