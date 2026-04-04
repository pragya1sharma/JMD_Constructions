const mongoose = require('mongoose');

/**
 * On-site workers (not Contractor/Supervisor app users) — used for attendance.
 */
const workerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Worker name is required'],
      trim: true,
      maxlength: [120, 'Name cannot exceed 120 characters'],
    },
    phone: {
      type: String,
      trim: true,
      match: [/^\+?[1-9]\d{1,14}$/, 'Please provide a valid phone number'],
    },
    roleOnSite: {
      type: String,
      trim: true,
      maxlength: [80, 'Role cannot exceed 80 characters'],
    },
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
      required: [true, 'Project assignment is required'],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    notes: {
      type: String,
      trim: true,
      maxlength: [500, 'Notes cannot exceed 500 characters'],
    },
  },
  { timestamps: true }
);

workerSchema.index({ project: 1, name: 1 });
workerSchema.index({ project: 1, isActive: 1 });

module.exports = mongoose.model('Worker', workerSchema);
