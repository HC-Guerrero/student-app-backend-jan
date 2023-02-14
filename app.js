const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')

const app = express();

app.use(cors());

// app needs to process json for post 
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

const studentsController = require('./controllers/studentsController');

app.use('/students', studentsController);

app.get('/', (req, res) => {
    res.send("Hello world");
});

module.exports = app;