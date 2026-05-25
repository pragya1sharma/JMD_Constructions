import mongoose from 'mongoose';
import vendorSchema from '../Schema/vendor.js';

export default mongoose.model('Vendor', vendorSchema);