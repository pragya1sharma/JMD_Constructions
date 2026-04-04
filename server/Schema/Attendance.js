const mongoose = require('mongoose');

/**
 * Daily attendance for workers on a project.
 * Contractor/Supervisor users are out of scope here (monthly payroll).
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
    worker: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Worker',
      required: [true, 'Worker is required'],
    },
    date: {
      type: Date,
      required: [true, 'Attendance date is required'],
    },
    status: {
      type: String,
      enum: ['Present', 'Absent','Half Day','Holiday'],
      required: [true, 'Status is required'],
    },
    
    recordedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);

attendanceSchema.index({ project: 1, date: -1 });
attendanceSchema.index({ worker: 1, date: 1 }, { unique: true });

module.exports = mongoose.model('Attendance', attendanceSchema);
