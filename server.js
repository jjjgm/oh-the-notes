//required files and directories
const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
//server port
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});




app.get('/api/notes', (req, res) => {
    const notes = JSON.parse(fs.readFileSync('./db/db.json', 'utf-8'));
    res.json(notes);
});

// posting notes
app.post('/api/notes', (req, res) => {
    const notes = JSON.parse(fs.readFileSync('./db/db.json', 'utf-8'));
    const newNote = req.body;
    newNote.id = notes.length.toString();
    notes.push(newNote);
    fs.writeFileSync('./db/db.json', JSON.stringify(notes));
    res.json(notes);
});

// deleting notes with an id
app.delete('/api/notes/:id', (req, res) => {
    const notes = JSON.parse(fs.readFileSync('./db/db.json', 'utf-8'));
    const updatedNotes = notes.filter(note => note.id !== req.params.id);
    fs.writeFileSync('./db/db.json', JSON.stringify(updatedNotes));
    res.json(updatedNotes);
});



app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});