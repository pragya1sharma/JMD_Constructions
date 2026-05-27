// manualNotesController.js
import asyncHandler from "../utils/asyncHandler.js";
import ManualNotesService from "../services/manualNotes.js";

class ManualNotesController {

    static createNote = asyncHandler(async (req, res) => {
        const userId = req.user.id;
        const message = req.body.message;
        const note = await ManualNotesService.createNote(userId, message);
        res.status(201).json({ success: true, message: "Note created", data: note });
    });

    static deleteNote = asyncHandler(async (req, res) => {
        const noteId = req.params.id;
        const userId = req.user.id;
        await ManualNotesService.deleteNote(noteId, userId);
        res.status(200).json({ success: true, message: "Note deleted" });
    });

    static editNote = asyncHandler(async (req, res) => {
        const noteId = req.params.id;
        const userId = req.user.id;
        const message = req.body.message;
        const note = await ManualNotesService.editNote(noteId, userId, message);
        res.status(200).json({ success: true, message: "Note updated", data: note });
    });
}

export default ManualNotesController;