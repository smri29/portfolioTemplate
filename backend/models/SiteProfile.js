const mongoose = require('mongoose');

const socialLinkSchema = new mongoose.Schema(
  {
    label: {
      type: String,
      trim: true,
      default: '',
    },
    iconKey: {
      type: String,
      trim: true,
      default: 'website',
    },
    url: {
      type: String,
      trim: true,
      default: '',
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  { _id: true }
);

const siteProfileSchema = new mongoose.Schema(
  {
    siteLabel: {
      type: String,
      trim: true,
      default: 'Portfolio',
    },
    fullName: {
      type: String,
      trim: true,
      default: 'Your Name',
    },
    professionalTitle: {
      type: String,
      trim: true,
      default: 'Your Professional Title',
    },
    logoImageUrl: {
      type: String,
      trim: true,
      default: '',
    },
    heroImageUrl: {
      type: String,
      trim: true,
      default: '',
    },
    aboutImageUrl: {
      type: String,
      trim: true,
      default: '',
    },
    resumeUrl: {
      type: String,
      trim: true,
      default: '',
    },
    resumeFileName: {
      type: String,
      trim: true,
      default: 'resume.pdf',
    },
    contactEmail: {
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
    socialLinks: {
      type: [socialLinkSchema],
      default: [],
    },
    contactHeading: {
      type: String,
      trim: true,
      default: "Let's Connect",
    },
    contactDescription: {
      type: String,
      trim: true,
      default: '',
    },
    footerText: {
      type: String,
      trim: true,
      default: '',
    },
    seoTitle: {
      type: String,
      trim: true,
      default: 'Portfolio Template',
    },
    seoDescription: {
      type: String,
      trim: true,
      default: 'A reusable portfolio template for developers, researchers, and professionals.',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('SiteProfile', siteProfileSchema);
