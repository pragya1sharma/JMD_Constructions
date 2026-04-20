const mongoose = require('mongoose');

/**
 * Daily attendance for workers on a project.
 * Contractor/Supervisor users are out of scope here (monthly payroll). -> filhaal I am keeping it for the supervisor
 * mongoose.Schems.Types.ObjectId -> is used for normalisation , hamm yahan pura object daalne k bajaye uski objectId daalte hain aur
 * wo ref k use se derefernce ho jaati hai.
 */

const attendanceSchema = new mongoose.Schema(
  {
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
      required: [true, 'Project is required'],
    },

    // Store allowed categories for this project
    categories: [
      {
        name: {
          type: String,
          required: true,
          trim: true,
        },
        isCustom: {
          type: Boolean,
          default: false, // true if added manually
        },
      },
    ],

    // Daily attendance logs
    logs: [
      {
        date: {
          type: Date,
          required: true,
        },

        entries: [
          {
            category: {
              type: String,
              required: true,
            },
            count: {
              type: Number,
              required: true,
              min: [0, 'Count cannot be negative'],
            },
          },
        ],

        recordedBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
      },
    ],
  },
  { timestamps: true }
);

// Ensure one attendance document per project
attendanceSchema.index({ project: 1 }, { unique: true });

module.exports = mongoose.model('Attendance', attendanceSchema);