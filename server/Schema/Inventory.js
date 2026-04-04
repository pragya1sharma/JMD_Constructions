const mongoose = require('mongoose');

/**
 * Site inventory — quantities per project (or site); restock when below threshold.
 */
const inventorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Item name is required'],
      trim: true,
      maxlength: [200, 'Name cannot exceed 200 characters'],
    },
    sku: {
      type: String,
      trim: true,
      uppercase: true,
      maxlength: [80, 'SKU cannot exceed 80 characters'],
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
    locationNote: {
      type: String,
      trim: true,
      maxlength: [300, 'Location note is too long'],
    },
    lastRestockedAt: {
      type: Date,
    },
    notes: {
      type: String,
      trim: true,
      maxlength: [1000, 'Notes cannot exceed 1000 characters'],
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);

inventorySchema.index({ project: 1, name: 1 });
inventorySchema.virtual('needsRestock').get(function () {
  return this.quantity <= this.restockThreshold;
});

module.exports = mongoose.model('Inventory', inventorySchema);
