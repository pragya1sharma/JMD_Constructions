const mongoose = require('mongoose');

/**
 * Tender — external or internal opportunities; supervisors mark interest / pin.
 * interestedBy / pinnedBy store User ids (typically supervisors).
 */
const tenderSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please enter a tender name'],
      trim: true,
      maxlength: [300, 'Tender name cannot exceed 300 characters'],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [5000, 'Description is too long'],
    },
    url: {
      type: String,
      trim: true,
      maxlength: [2000, 'URL is too long'],
    },
    deadline: {
      type: Date,
    },
    status: {
      type: String,
      enum: ['Open', 'Submitted', 'Awarded', 'Lost', 'Closed', 'Withdrawn'],
      default: 'Open',
    },
    /** Supervisors who flagged interest */
    interestedBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    /** Supervisors who pinned this tender for quick access */
    pinnedBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    /** Optional: contractor who created the record */
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);

tenderSchema.index({ status: 1, deadline: 1 });
tenderSchema.index({ name: 1 });

module.exports = mongoose.model('Tender', tenderSchema);
