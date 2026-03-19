const mongoose = require('mongoose');

const appearanceSettingsSchema = new mongoose.Schema(
  {
    paletteKey: {
      type: String,
      trim: true,
      default: 'olive-teal-glass',
    },
    motionPreset: {
      type: String,
      trim: true,
      default: 'balanced',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('AppearanceSettings', appearanceSettingsSchema);
