const express = require('express')
const { getStudents, getStudentByID, createStudent, updateStudent, deleteStudent   
 } = require('../controllers/studentController')

//router obeject
const router = express.Router()

//----------routes-------------
//get all students list || GET
router.get('/getall', getStudents)

//get student by id
router.get('/get/:id',getStudentByID)

// create student  || POST
router.post('/create', createStudent)

//update student || PUT
router.put('/update/:id',updateStudent)

//delete student || DELETE
router.delete('/delete/:id',deleteStudent)

module.exports = router;