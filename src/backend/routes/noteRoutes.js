const express = require('express');
const noteRouter = express.Router();
const { getNotes, getNote, createNote, updateNote, deleteNote } = require('../controllers/noteController')

noteRouter.get('/', getNotes);
noteRouter.get('/:id', getNote);
noteRouter.post('/', createNote);
noteRouter.put('/:id', updateNote);
noteRouter.delete('/:id', deleteNote);

module.exports = noteRouter;
