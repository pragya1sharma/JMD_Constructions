const mongoose = require('mongoose');

/**
 * Audit / activity feed — who did what on which module.
 */
const activityLogSchema = new mongoose.Schema(
  {
    actor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Actor is required'],
    },
    action: {
      type: String,
      required: [true, 'Action is required'],
      trim: true,
      maxlength: [120, 'Action label is too long'],
    },
    module: {
      type: String,
      required: [true, 'Module name is required'],
      trim: true,
      maxlength: [80, 'Module name is too long'],
    },
    entityId: {
      type: mongoose.Schema.Types.ObjectId,
    },
    entityLabel: {
      type: String,
      trim: true,
      maxlength: [300, 'Entity label is too long'],
    },
    metadata: {
      type: mongoose.Schema.Types.Mixed,
    },
  },
  { timestamps: true }
);

activityLogSchema.index({ createdAt: -1 });
activityLogSchema.index({ module: 1, createdAt: -1 });
activityLogSchema.index({ actor: 1, createdAt: -1 });

module.exports = mongoose.model('ActivityLog', activityLogSchema);
