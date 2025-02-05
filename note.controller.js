const { Note } = require("../models/Note");
const bcrypt = require('bcrypt')


const createNote = async (req, res) => {
    try {
        const { title, content } = req.body;
        if (!title || !content) {
            return res.status(404).json({
                message: "Something is missing",
                success: false
            })
        }
        const newNote = await Note.create({
            title: title,
            content: content
        })

        return res.status(202).json({
            message: "Note created successfully",
            success: true,
        })
    }
    catch (error) {
        return res.status(505).json({
            message: "Internal server error",
            success: false
        })
    }

}

const getNotes = async (req, res) => {
    try {
        const userId = req.id;
        const notes = await Note.find({ userId: userId }).sort({ createdAt: -1 });
        if (!notes) {
            return res.status(404).json({
                message: "Currently there is not Note",
                success: false
            })
        }
        return res.status(200).json({
            message: "Notes retrieved successfully",
            success: true,
        })
    }
    catch (error) {
        return res.status(505).json({
            message: "Internal server error",
            success: false
        })
    }
}

const getNoteById = async (req, res) => {
    try {
        const noteId = req.params.id;
        const note = await Note.findById(noteId);
        if (!note) {
            return res.status(404).json({
                message: "Note not found",
                success: false
            })
        }
        return res.status(200).json({
            message: "Note retrieved successfully",
            success: true,
            note: note
        })
    }
    catch (error) {
        return res.status(505).json({
            message: "Internal server error",
            success: false
        })
    }
}

const deleteNoteById = async (req, res) => {
    try {
        const noteId = req.params.id;
        const note = await Note.findByIdAndDelete(noteId);
        if (!note) {
            return res.status(404).json({
                message: "Note not found",
                success: false
            })
        }
        return res.status(200).json({
            message: "Note deleted successfully",
            success: true
        })
    }
    catch (error) {
        return res.status(505).json({
            message: "Internal server error",
            success: false
        })
    }

}

const editNoteById = async (req, res) => {
    try {
        const noteId = req.params.id;
        const note = await Note.findById(noteId);
        const { title, content } = req.body
        if (!note) {
            return res.status(404).json({
                message: "Note not found",
                success: false
            })

        }
        if (title) {
            note.title = title
        }
        if (note.content) {
            note.content = content
        }
        await note.save()
        return res.status(200).json({
            message: "Note updated successfully",
            success: true
        })
    }
    catch (error) {
        return res.status(505).json({
            message: "Internal server error",
            success: false
        })
    }
}

module.exports = { createNote, getNotes, deleteNoteById, editNoteById }