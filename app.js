const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());

const studentsController = require('./controllers/studentsController');

app.use('/students', studentsController);

app.get('/', (req, res) => {
    res.send("Hello world");
});

module.exports = app;