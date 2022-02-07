const express = require('express');
const { Mongoose } = require('mongoose');
const router = express.Router()
const fetchuser = require('../middleware/fetchuser')
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator');

//  ROUTE 1:-GET ALL THE NOTES  GET:"api/notes/getuser" Login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        res.json(notes)
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error!")
    }

})

//  ROUTE 2:-ADD ALL THE NOTES  POST:"api/notes/addnote" Login required
router.post('/addnote', fetchuser, [
    body('title', 'Enter a valid title').isLength(),
    body('description', 'Enter a valid description').isLength({ min: 5 }),], async (req, res) => {
        try {
            const { title, description, tag } = req.body;
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const note = new Note({
                title, description, tag, user: req.user.id
            })
            const saveNote = await note.save()
            // const notes = await notes.find({ user: req.user.id });
            res.json(saveNote)

        } catch (error) {
            console.log(error.message);
            res.status(500).send("Internal Server Error!")
        }
    })

//  ROUTE 3:-UPDATE THE EXISTING NOTE PUT:"api/notes/updatenote" Login required
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const {title, description, tag} = req.body;
    try {
        //create a new note object 
        const newNote = {};
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };

        //Find the note to be updated and update it
        let note = await Note.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found") }

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed")
        }
        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ note });
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error!")
    }
})

//  ROUTE 4:-DELETE THE EXISTING NOTE DELETE:"api/notes/deletenote" Login required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;
    try {
        //Find the note to be delete and delete it
        let note = await Note.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found") }

        //allow the delete operation only for authenticated user

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed")
        }

        note = await Note.findByIdAndDelete(req.params.id)
        res.json({ "success": "Note Has been Deleted", note: note });
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error!")
    }
})


module.exports = router;