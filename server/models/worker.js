import mongoose from 'mongoose';
import workerSchema from '../Schema/Worker.js';

export default mongoose.model('Worker', workerSchema);