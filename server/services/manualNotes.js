import NOTES from "../models/manualNotes.js";
import USER from "../models/user.js";
import ErrorResponse from "../utils/errorResponse.js";

class ManualNotesService {

    // Create note
    static async createNote(userID, message, metadata = {}) {
        const user = await USER.findById(userID);

        if (!user) {
            throw new ErrorResponse("Note cannot be created without the user", 404);
        }

        const note = await NOTES.create({
            notes: message,
            createdBy: user._id,
            metadata: metadata
        });

        return note;
    }

    static async getNotes(userID) {
        const notes = await NOTES.find({ createdBy: userID }).sort({ createdAt: -1 });
        if (notes.length === 0) {
            throw new ErrorResponse("No note found created by the given user", 404);
        }
        return notes;
    }

    // Delete note
    static async deleteNote(noteID, userID) {
        const note = await NOTES.findById(noteID);

        if (!note) {
            throw new ErrorResponse("No such note found", 404);
        }

        const creator = note.createdBy.toString();

        // Check if 3 months have passed since creation
        const threeMonthsAgo = new Date();
        threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
        const isExpired = note.createdAt < threeMonthsAgo;

        if (creator !== userID && !isExpired) {
            throw new ErrorResponse("User not authorised to delete this note", 403);
        }

        await NOTES.findByIdAndDelete(noteID);
        return { message: "Note deleted successfully" };
    }

    // Edit note
    static async editNote(noteID, userID, message) {
        const note = await NOTES.findById(noteID);

        if (!note) {
            throw new ErrorResponse("No such note found", 404);
        }

        const creator = note.createdBy.toString();
        if (creator !== userID) {
            throw new ErrorResponse("User not allowed to edit this note", 403);
        }

        const updatedNote = await NOTES.findByIdAndUpdate(
            noteID, 
            { notes: message }, 
            { new: true, runValidators: true }
        );
        
        return updatedNote;
    }
}

export default ManualNotesService;