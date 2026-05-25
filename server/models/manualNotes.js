import mongoose from 'mongoose';
import NotesSchema from '../Schema/manualNotes.js';

export default mongoose.model('Notes', NotesSchema);