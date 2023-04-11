//required files and directories
const express = require('express');
const path = require('path');
const fs = require('fs');
const uuid = require('./helpers/uuid');

const app = express();
// this is the default server evnironment configuration
const PORT = process.env.PORT || 3001;

// this is the middleware for parsing any JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// this is the middleware for serving any static files
app.use(express.static('public'));

// this is a GET route for the notes page
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});

//this will GET a route for all notes
app.get('/api/notes', (req, res) => {
    const notes = JSON.parse(fs.readFileSync('./db/db.json', 'utf-8'));
    res.json(notes);
});

//this will POST a route for a new note
app.post('/api/notes', (req, res) => {
    const newNote = {
        id: uuid(),
        title: req.body.title,
        text: req.body.text
    };
    const notes = JSON.parse(fs.readFileSync('./db/db.json', 'utf-8'));
    notes.push(newNote);
    fs.writeFileSync('./db/db.json', JSON.stringify(notes));
    res.json(newNote);
});

//this gets the route for index page
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

//this runs the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
