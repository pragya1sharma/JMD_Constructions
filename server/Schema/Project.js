const mongoose = require('mongoose');

/**
 * Project lifecycle: Running | Completed (past) | Future (upcoming).
 * Supervisors: refs to User with role Supervisor.
 */
const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please mention the project name'],
      trim: true,
      maxlength: [300, 'Project name cannot exceed 300 characters'],
    },

    type: {
      type: String,
      required: [true, 'Please choose Running, Completed, or Future'],
      enum: ['Running', 'Completed', 'Future'],
    },

    startDate: {
      type: Date,
      required: [true, 'Start date is required'],
    },

    endDate: {
      type: Date,
      required: function () {
        return this.type === 'Completed';
      },
      validate: {
        validator: function (value) {
          if (this.type === 'Completed' && value && this.startDate) {
            return value >= this.startDate;
          }
          return true;
        },
        message: 'End date must be on or after start date',
      },
    },

    expectedEndDate: {
      type: Date,
      required: function () {
        return this.type !== 'Completed';
      },
      validate: {
        validator: function (value) {
          if (this.type !== 'Completed' && value && this.startDate) {
            return value > this.startDate;
          }
          return true;
        },
        message: 'Expected end date must be after start date',
      },
    },

    /** Visible to contractors in UI; filter in API/FE for supervisors if needed */
    expectedBudget: {
      type: Number,
      required: [true, 'Expected budget is required'],
      min: [0, 'Budget cannot be negative'],
    },

    Supervisors: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
      ],
      validate: {
        validator: function (value) {
          return Array.isArray(value) && value.length > 0;
        },
        message: 'At least one supervisor is required',
      },
    },

    siteLocation: {
      address: {
        type: String,
        required: [true, 'Site address or location description is required'],
        trim: true,
        maxlength: [500, 'Address cannot exceed 500 characters'],
      },
      googleMapsLink: {
        type: String,
        trim: true,
        maxlength: [2000, 'Maps link is too long'],
      },
    },

    notes: {
      type: String,
      trim: true,
      maxlength: [2000, 'Notes cannot exceed 2000 characters'],
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);

projectSchema.index({ type: 1, updatedAt: -1 });
projectSchema.index({ type: 1, endDate: -1 });

module.exports = mongoose.model('Project', projectSchema);
