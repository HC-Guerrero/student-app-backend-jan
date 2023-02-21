// import the db 
const db = require('../db/dbConfig');

const getAllStudents = async () => {
    const students = await db.any(`
        SELECT * FROM students;
    `)

    return students;
}

const getStudent = async (id) => {
    const student = await db.oneOrNone(`
        SELECT * FROM students
        WHERE id = ${id}
    `)

    return student;
}

const saveStudent = async (studentData) => {
    const {firstName, lastName, city, skill, pic, company, email} = studentData;

    const student = await db.one(`
        INSERT INTO students (first_name, last_name, city, skill, pic, company, email)
        VALUES ('${firstName}', '${lastName}', '${city}', '${skill}', '${pic}', '${company}', '${email}')
        RETURNING *;
        `
    )

    return student;
}

const updateStudent = async (studentData) => {
    
    // fetch the student from the database
    let currStudent = await db.one(`
        SELECT * FROM students
        WHERE id = ${studentData.id}
    `)

    // if the student doesn't exist, throw an error
    if(!currStudent){
        throw new Error('Student not found');
    }

    // merge the student data with the current student data
    currStudent = {...currStudent, ...studentData};

    const student = await db.one(`
        UPDATE students
        SET first_name = '${currStudent.firstName}',
            last_name = '${currStudent.lastName}',
            city = '${currStudent.city}',
            skill = '${currStudent.skill}',
            pic = '${currStudent.pic}',
            company = '${currStudent.company}',
            email = '${currStudent.email}'
        WHERE id = ${currStudent.id}
        RETURNING *; 
    `)

    return student;
}

const deleteStudent = async (studentId) => {
    const deletedStudent = await db.one(`
        DELETE FROM students 
        WHERE id = ${studentId}
        RETURNING *;
    `)

    return deletedStudent;
}

module.exports = {
    getAllStudents,
    getStudent,
    saveStudent, 
    updateStudent, 
    deleteStudent
} 

