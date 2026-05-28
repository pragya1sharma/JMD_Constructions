import mongoose from 'mongoose';
//we haven'r used zod here, did without it , used zod in the validations

/**
 * Project lifecycle: Running | Completed (past) | Future (upcoming).
 * assignedSupervisor: ref to User with role Supervisor.
 * assignedContractor: ref to User with role Contractor.
 */
const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please mention the project name'],
      trim: true,
      maxlength: [300, 'Project name cannot exceed 300 characters'],
    },

    status: {
      type: String,
      required: [true, 'Please choose Running, Completed, or Future'],
      enum: ['Running', 'Completed', 'Future'],
    },

    pinned:{
      type: Boolean,
      required: [true]
      
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
      min: [0, 'Budget cannot be negative'],
    },

    assignedContractor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'A contractor must be assigned to the project'],
    },

    assignedSupervisor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [function () { return this.status !== 'Future'; }, 'A supervisor must be assigned unless the project status is set to Future'],
    },

    siteLocation: {
      address: {
        type: String,
        required: [true, 'Site address or location description is required.'],
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

    //No need of profile Image for Now, will do this for V2.
    // createdBy: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: 'User',
    // },
  },
  { timestamps: true }
);

projectSchema.index({ status: 1, updatedAt: -1 });
projectSchema.index({ status: 1, endDate: -1 });

export default mongoose.model('Project', projectSchema);