const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema(
  {
    code: { type: String, required: true },
    language: { type: String, required: true },
    provider: {
      type: String,
      enum: ['gemini', 'openrouter'],
      default: 'gemini',
    },
    model: { type: String, default: '' },
    review: { type: String, required: true },
    bugsCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Review', ReviewSchema);
