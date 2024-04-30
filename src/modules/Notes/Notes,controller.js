
import Note from "../../../DB/notes.model.js"
import User from "../../../DB/user.model.js"

// Function to add a new note
export const addNote = async (req, res, next) => {
    const { title, content, user_id } = req.body; // Extracting note details from the request body

    // Checking if a note with the provided content already exists
    const isContentCheck = await Note.findOne({ where: { content } });
    if (isContentCheck) {
        return res.json({ message: 'Note with the same content already exists' });
    }

    // Creating a new note with the provided details
    const newNote = await Note.create({ title, content, user_id });
    if (newNote._options.isNewRecord) {
        return res.json({ message: 'Note added successfully' });
    }
    return res.json({ message: 'Failed to add note' });
};

// Function to get all notes
export const getAllNotes = async (req, res, next) => {
    const notes = await Note.findAll(); // Finding all notes in the database
    res.json({ message: 'Success', notes }); // Returning success message along with the list of notes
};

// Function to delete a note
export const Delete = async (req, res, next) => {
    const { id, user_id } = req.params; // Extracting note ID and user ID from the URL parameters

    // Finding the note by ID and user ID
    const note = await Note.findByPk(user_id, { where: { user_id: Note.user_id } });
    if (!note) {
        return res.json({ message: "Note not found" });
    }

    // Checking if the note exists in the user's notes
    const searchById = await Note.findByPk(id);
    if (!searchById) {
        return res.json({ message: "Note does not exist" });
    }

    // Deleting the note from the database
    const deleteNote = await Note.destroy({ where: { id } });
    if (!deleteNote) {
        return res.json({ message: "Note not deleted" });
    }

    return res.json({ message: "Note deleted successfully" });
};

// Function to update a note
export const update = async (req, res, next) => {
    const { title, content } = req.body; // Extracting updated note details from the request body
    const { id, user_id } = req.params; // Extracting note ID and user ID from the URL parameters

    // Finding the note by user ID
    const note = await Note.findByPk(user_id, { where: { user_id: Note.user_id } });
    if (!note) {
        return res.json({ message: "Note not found" });
    }

    // Finding the note by ID
    const noteById = await Note.findByPk(id);
    if (!noteById) {
        return res.json({ message: "Note not found" });
    }

    // Updating the note with the provided details
    const updateResult = await Note.update({ title, content }, { where: { id } });
    if (!updateResult.length) {
        return res.json({ message: "Update failed" });
    }

    return res.json({ message: "Note updated successfully" });
};

// Function to get all notes with their owners
export const getAllNotesWithOwner = async (req, res, next) => {
    // Retrieving all notes and including the associated user details
    const notesWithOwner = await Note.findAll({
        include: [{ model: User, attributes: ['id', 'name', 'email', 'age'] }]
    });
    return res.json({ message: 'Success', notesWithOwner });
};
