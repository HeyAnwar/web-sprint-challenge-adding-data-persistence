// build your `/api/tasks` router here
const express = require('express')

const Task = require('./model')

const router = express.Router()

const checkName = (req, res, next) => {
    const { task_name, task_description } = req.body
    if (!task_name) {
        res.status(400).json({
            message: 'Task name is required'
        })
        next()
    }else if (!task_description) {
            res.status(400).json({
                message: 'Task description is required'
            })
            next()
        }else {
            next()
        }
}

router.get('/', (req, res, next) => {
    Task.find()
    .then((tasks) => {
        res.status(200).json(tasks)
    })
    .catch((err) => {
        next(err)
    })
})

router.post('/', checkName, (req, res, next) => {
    const newTask = req.body
    Task.create(newTask)
    .then((task) => {
        res.status(201).json(task)
    })
    .catch((err) => {
        next(err)
    })
})

module.exports = router