import mongoose from 'mongoose';
import userSchema from '../Schema/User.js';

export default mongoose.model('User', userSchema);