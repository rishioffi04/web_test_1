const express = require('express')
const { createNote, getNotes, deleteNoteById, editNoteById } = require('../controllers/note.controller')
const isAuthenticated = require('../middleware/isAuthenticated')

const router = express.Router()

router.post('/createNote',isAuthenticated,createNote)
router.get('/getNotes',isAuthenticated,getNotes)
router.delete('/deleteNoteById',isAuthenticated,deleteNoteById)
router.post('/editNoteById',isAuthenticated,editNoteById)

module.exports = router