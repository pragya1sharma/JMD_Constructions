import mongoose from 'mongoose';
import projectSchema from '../Schema/Project.js';

export default mongoose.model('Project', projectSchema);