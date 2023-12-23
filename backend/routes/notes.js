const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");

// Get all notes
router.get("/fetchallnotes", fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("some error occured");
    }
});

// Add new Note using post
router.post(
    "/addnote",
    fetchuser,
    body("title", "Enter a title of mininum 5 characters").isLength({ min: 5 }),
    body("description", "Enter a Description of mininum 5 characters").isLength({
        min: 5,
    }),
    async (req, res) => {
        try {
            const { title, description, tag } = req.body;
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const note = new Notes({
                title,
                description,
                tag,
                user: req.user.id,
            });
            const savenote = await note.save();
            res.json(savenote);
        } catch (error) {
            console.error(error.message);
            res.status(500).send("some error occured");
        }
    }
);

// Update an Existing note
router.put("/updatenote/:id", fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;
    const newNote = {};
    if (title) {
        newNote.title = title;
    }
    if (description) {
        newNote.description = description;
    }
    if (tag) {
        newNote.tag = tag;
    }

    let note = await Notes.findById(req.params.id);
    if (!note) {
        return res.status(404).send("not found");
    }
    if (note.user.toString() !== req.user.id) {
        return res.status(404).send("User not found");
    }
    note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
    res.json(note);
});

//Delete an existing node using Delete
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
    let note = await Notes.findById(req.params.id);
    if (!note) {
        return res.status(404).send("not found");
    }
    if (note.user.toString() !== req.user.id) {
        return res.status(404).send("User not found");
    }
    note = await Notes.findByIdAndDelete(req.params.id);
    res.json({"Success":  "Note has been Deleted Succesfully",note:note});

});


module.exports = router;
