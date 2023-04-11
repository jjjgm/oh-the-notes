const express = require('express');
const fs = require('fs');
const path = require('path');

const PORT = process.env. PORT || 3001;

const app = express();

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



// Data will be stored in the db.json file
const dbPath = path.join(__dirname, './db/db.json')



// To write new data into db.json in string format else creates an error
const writeToFile = (data, callback) => {
    fs.writeFile(dbPath, JSON.stringify(parsedJson), err => {
        if (err) {
            console.error(err);
            return;
        }
        console.log('note writing');
    });
}


app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT}`)
);