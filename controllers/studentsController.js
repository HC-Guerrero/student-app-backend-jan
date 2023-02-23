const express = require('express');
const controller = express.Router();

const {getAllStudents, getStudent, saveStudent, updateStudent, deleteStudent} = require('../queries/students')
const {isValidEmail} = require('../utils/validators');
const studentData = require('../studentData.json');

controller.get('/', async (req, res) => {

    const students = await getAllStudents();
    res.json(students);
})

controller.get('/:id', async (req, res) => {

        const {id} = req.params;
        try {
            //if id is not all digits
            if(!/[0-9]/g.test(id)){
                // send an error with a message to only use digits
                throw ('Student id must be all digits');
            }
    
        // find one student by their id
        const student = await getStudent(id);
    
        if(!student){
            throw("No student found with this id.");
        }
    
        res.json(student);
    } catch (err){
        res.status(500).send(err);
    }
})


controller.post('/', async (req, res) => {
    try {    
        const studentData = req.body;
        
        if(!studentData.email){
            throw 'Email is required'
        } else if ( !isValidEmail(studentData.email)) {
            throw 'Email is not valid';
        }

        const student = await saveStudent(studentData)

        const data = {
            payload: student,
            status: 'success'
        }
      
        res.json(data);
    } catch (err){
        res.status(500).send(err)
    }
});

controller.put('/:id', async (req, res) => {
    try {
        const studentData = {id: req.params.id, ...req.body};

        //validate email
        if(studentData.email && !isValidEmail(studentData.email)){
            throw 'Please use a valid email';
        }

        const student = await updateStudent(studentData);

        res.json(student);


    } catch (err){
        res.status(500).send(err);
    }
})

controller.delete('/:id', async (req, res) => {
    try {
        const studentId = req.params.id;
        
        // delete a student matching the given id 
        const deletedStudent = await deleteStudent(studentId);

        res.json(deletedStudent);


    } catch (err){
        res.status(500).send(err)
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