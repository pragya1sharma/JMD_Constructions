import mongoose from 'mongoose';
import tenderSchema from '../Schema/tender.js';

export default mongoose.model('Tender', tenderSchema);