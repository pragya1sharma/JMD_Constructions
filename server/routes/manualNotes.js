// routes/manualNotes.js
import express from 'express';
import ManualNotesController from '../controllers/manualNotesController.js';
import { protect } from '../middleware/auth.js';
import { validateRequest } from '../middleware/validation.js';
import { createNoteSchema, editNoteSchema } from '../validations/notesValidation.js';

const router = express.Router();

router.post('/', protect, validateRequest(createNoteSchema), ManualNotesController.createNote);
router.put('/:id', protect, validateRequest(editNoteSchema), ManualNotesController.editNote);
router.delete('/:id', protect, ManualNotesController.deleteNote);

export default router;