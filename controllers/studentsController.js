const express = require('express');
const controller = express.Router();

const {saveStudent, updateStudent} = require('../queries/students')

const studentData = require('../studentData.json');

controller.get('/', (req, res) => {

    const students = studentData.students;

    res.json(students);
})

controller.get('/:id', (req, res) => {

        const {id} = req.params;
        try {
            //if id is not all digits
            if(!/[0-9]/g.test(id)){
                // send an error with a message to only use digits
                throw ('Student id must be all digits');
            }
    
        // find one student by their id
        const student = studentData.students.find(student => student.id === id)
    
        if(!student){
            throw("No student found with this id.");
        }
    
        res.json(student);
    } catch (err){
        console.log(err);
        res.status(500).send(err);
    }
})


controller.post('/', async (req, res) => {
    try {    
        const studentData = req.body;
        
        if(!studentData.email){
            res.status(500).send('Email is required');
        } else if ( !isValidEmail(studentData.email)) {
            res.status(500).send('Email is not valid');
        }

        const student = await saveStudent(studentData)
        res.json(student);
    } catch (err){
        res.status(500).send(err.message)
    }
});

function isValidEmail(email){
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
}

controller.put('/', async (req, res) => {
    try {

        const studentData = req.body;

        //validate email
        if(studentData.email && !isValidEmail(studentData.email)){
            res.status(500).send('Please use a valid email');
            return;
        }

        const student = await updateStudent(studentData);

        res.json(student);


    } catch (err){
        res.status(500).send(err.message);
    }
})

//modify this route so that it takes two params
// the first is tht id of the first student in the response
// // the second is the number of students to include in the resppnse
controller.get('/:startId/:limit', (req, res) => {

    const {startId, limit} = req.params;
    
    // find the index of the student with startId
    const studentArr = studentData.students;
    const firstStudentIndex = studentArr.findIndex(student => student.id === startId)
    const selectedStudents = studentArr.slice(firstStudentIndex, Number(firstStudentIndex) + Number(limit));

    res.json(selectedStudents);
})


module.exports = controller;