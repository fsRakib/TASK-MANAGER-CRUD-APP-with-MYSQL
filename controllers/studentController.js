const db = require("../config/db");

//get all student list
const getStudents = async (req, res) => {
    try {
        const data = await db.query(" SELECT * FROM task ");
        if (!data) {
            return res.status(404).send({
                success: false,
                message: "No Records found",
            });
        }
        res.status(200).send({
            success: true,
            message: "All Students Records",
            totalStudents: data[0].length,
            data: data[0],
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in Get All task API',
            error,
        });
    }
};

//get student by id
const getStudentByID = async (req, res) => {
    try {
        const studentId = req.params.id
        if (!studentId) {
            return res.status(404).send({
                success: false,
                message: 'Invalid Or Provide task id'
            });
        }

        const data = await db.query(`SELECT * FROM task WHERE id=?`, [studentId,]);
        if (!data) {
            return res.status(404).send({
                success: false,
                message: 'no Records found'
            });
        }
        res.status(200).send({
            success: true,
            studentDetails: data[0],
        });
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in get task by id API',
            error
        })
    }
};

// create student
const createStudent = async (req, res) => {
    try {
        const { Title, Description, Status } = req.body
        if (!Title || !Description || !Status) {
            return res.status(500).send({
                success: false,
                message: 'Please provide all fields'
            });
        }
        const data = await db.query(`INSERT INTO task(Title, Description, Status) VALUES(?,?,?)`, [Title, Description, Status]);
        if (!data) {
            return res.status(404).send({
                success: false,
                message: 'Error in insert query'
            });
        }
        res.status(201).send({
            success: true,
            message: 'New task record created',
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in Create User API',
            error
        })
    }
};

// update student
const updateStudent = async (req, res) => {
    try {
        const studentId = req.params.id;
        if (!studentId) {
            return res.status(404).send({
                success: false,
                message: 'Invalid ID or Provide User ID'
            });
        }
        const { Title, Description, Status } = req.body;
        const data = await db.query(`UPDATE task SET Title=?, Description=?, Status=? WHERE id=?`, [Title, Description, Status, studentId]);
        if (!data) {
            return res.status(500).send({
                success: false,
                message: 'Error in update data'
            })
        }
        res.status(200).send({
            success: true,
            message: "Task Updated",
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in Update Student API',
            error: error.message
        });
    }
};

//DELETE student
const deleteStudent = async (req, res) => {
    try {
        const studentId = req.params.id;
        if (!studentId) {
            return res.status(404).send({
                success: false,
                message: 'please provide valid task ID'
            })
        }
        await db.query(`DELETE FROM task WHERE id=?`, [studentId]);
        res.status(200).send({
            success: true,
            message: "Task Deleted Successfully",
        });
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in Delete Student API',
            error
        });
    }
}

module.exports = { getStudents, getStudentByID, createStudent, updateStudent, deleteStudent };