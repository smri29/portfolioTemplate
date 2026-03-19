const mongoose = require('mongoose');

const aiSettingsSchema = new mongoose.Schema(
  {
    assistantName: {
      type: String,
      trim: true,
      default: 'Portfolio AI',
    },
    assistantSubtitle: {
      type: String,
      trim: true,
      default: 'The personalized assistant for this portfolio',
    },
    primaryGoal: {
      type: String,
      trim: true,
      default: '',
    },
    currentRole: {
      type: String,
      trim: true,
      default: '',
    },
    location: {
      type: String,
      trim: true,
      default: '',
    },
    opportunityFocus: {
      type: String,
      trim: true,
      default: '',
    },
    contactEmail: {
      type: String,
      trim: true,
      default: '',
    },
    portfolioUrl: {
      type: String,
      trim: true,
      default: '',
    },
    linkedinUrl: {
      type: String,
      trim: true,
      default: '',
    },
    githubUrl: {
      type: String,
      trim: true,
      default: '',
    },
    kaggleUrl: {
      type: String,
      trim: true,
      default: '',
    },
    facebookUrl: {
      type: String,
      trim: true,
      default: '',
    },
    responseStyle: {
      type: String,
      trim: true,
      default: '',
    },
    knowledgeBase: {
      type: String,
      trim: true,
      default: '',
    },
    responseRules: {
      type: String,
      trim: true,
      default: '',
    },
    additionalKnowledge: {
      type: String,
      trim: true,
      default: '',
    },
    fallbackReply: {
      type: String,
      trim: true,
      default: '',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('AISettings', aiSettingsSchema);
