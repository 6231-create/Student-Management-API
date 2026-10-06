import express from 'express'
import students from '../data/students.js'

const router = express.Router()


let nextId = 4


router.get('/students', (req, res) => {
    res.status(200).json({
        message: 'Students fetched successfully',
        success: true,
        students
    })
})


router.get('/students/:id', (req, res) => {
    const id = Number(req.params.id)

    let student = students.find((element) => element.id === id)

    if (!student) {
        return res.status(404).json({
            message: 'Student not found',
            success: false
        })
    }

    res.status(200).json({
        message: 'Student fetched successfully',
        success: true,
        student
    })
})


router.post('/students', (req, res) => {
    let { name, course } = req.body

    if (!name || !course) {
        return res.status(400).json({
            message: 'name and course are required',
            success: false
        })
    }

    let newStudent = { id: nextId, name, course }
    nextId = nextId + 1

    students.push(newStudent)

    res.status(201).json({
        message: 'Student created successfully',
        success: true,
        student: newStudent
    })
})


router.put('/students/:id', (req, res) => {
    const id = Number(req.params.id)
    let { name, course } = req.body

    let student = students.find((element) => element.id === id)

    if (!student) {
        return res.status(404).json({
            message: 'Student not found',
            success: false
        })
    }

    if (!name && !course) {
        return res.status(400).json({
            message: 'Provide name or course to update',
            success: false
        })
    }

    if (name) {
        student.name = name
    }
    if (course) {
        student.course = course
    }

    res.status(200).json({
        message: 'Student updated successfully',
        success: true,
        student
    })
})



router.delete('/students/:id', (req, res) => {
    const id = Number(req.params.id)

    let student = students.find((element) => element.id === id)

    if (!student) {
        return res.status(404).json({
            message: 'Student not found',
            success: false
        })
    }

    let index = students.findIndex((element) => element.id === id)
    students.splice(index, 1)

    res.status(200).json({
        message: 'Student deleted successfully',
        success: true,
        students
    })
})

export default router
