
import mongoose from 'mongoose';
import AttendanceSchema from '../Schema/Attendance.js';

export default mongoose.model('Attendance', AttendanceSchema);
