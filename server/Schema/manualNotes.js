import mongoose from 'mongoose';

/**
 * Manual notes — who wrote what.
 */
const manualNotesSchema = new mongoose.Schema(
  {
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Actor is required'],
    },
    notes: {
      type: String,
      required: [true, 'Any comments/notes/messages are to be written'],
      trim: true,
      maxlength: [500, 'Message is too long'],
    },
    metadata: {
      type: mongoose.Schema.Types.Mixed,
    },
  },
  { timestamps: true }
);

manualNotesSchema.index({ createdAt: -1 });
manualNotesSchema.index({ createdBy: 1, createdAt: -1 }); // ✅ fixed: actor → createdBy

export default mongoose.model('manualNotes', manualNotesSchema);