const mongoose = require('mongoose');

/**
 * Simple site inventory per project
 */
const inventorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Item name is required'],
      trim: true,
      maxlength: [200, 'Name cannot exceed 200 characters'],
    },

    unit: {
      type: String,
      required: [true, 'Unit is required (e.g. bags, kg, pcs)'],
      trim: true,
      maxlength: [40, 'Unit cannot exceed 40 characters'],
    },

    quantity: {
      type: Number,
      required: [true, 'Quantity is required'],
      min: [0, 'Quantity cannot be negative'],
      default: 0,
    },

    //set 0 for this for now
    restockThreshold: {
      type: Number,
      min: [0, 'Threshold cannot be negative'],
      default: 0,
    },

    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
      required: [true, 'Project is required for site inventory'],
    },

    usageLogs: [
      {
        type: {
          type: String,
          enum: ['IN', 'OUT'],
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: [0, 'Quantity cannot be negative'],
        },
        date: {
          type: Date,
          default: Date.now,
        },
      },
    ],

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Inventory', inventorySchema);