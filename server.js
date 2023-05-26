//required files and directories
const express = require('express');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

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
        id: uuidv4(),
        title: req.body.title,
        text: req.body.text
    };
    const notes = JSON.parse(fs.readFileSync('./db/db.json', 'utf-8'));
    notes.push(newNote);
    fs.writeFileSync('./db/db.json', JSON.stringify(notes));
    res.json(newNote);
});

app.delete('/api/notes/:id', (req, res) => {
    const id = req.params.id;
    const notes = JSON.parse(fs.readFileSync('./db/db.json', 'utf-8'));
            // Make a new array of all tips except the one with the ID provided in the URL
            const result = notes.filter((note) => note.id !== id);

            // Save that array to the filesystem
            fs.writeFileSync('./db/db.json', JSON.stringify(result));

            // Respond to the DELETE request
            res.json(result);
});


//this gets the route for index page
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

//this runs the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
