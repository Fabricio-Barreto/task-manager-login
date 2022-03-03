const express = require('express')
const Task = require('../models/task')
const auth = require('../middleware/auth')
const router = new express.Router()

router.post('/tasks', auth, async (req, res) => {  
    const task = new Task({
        ...req.body,
        owner: req.user._id
    })

    try {
        await task.save()
        res.status(201).send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})

// GET /tasks?completed=trueORfalse
// GET /tasks?limit=10&skip=10
// GET / tasks?sortBy=createdAt:asc
router.get('/tasks', auth, async (req, res) => {
    try {
        const match = {}
        // const sort = {}

        if (req.query.completed) {
            match.completed = req.query.completed === 'true'
        }

        /*  implement sort methods for get tasks */
        // if (req.query.sortBy) {
        //     const parts = req.query.sortBy.split(':')
        //     sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
        // }

        if (typeof match.completed === "undefined") {
            const task = await Task.find({ owner: req.user._id}).limit(parseInt(req.query.limit)).skip(req.query.skip)
            //console.log('2')
            res.send(task)
        } else {
            //console.log("1")
            const task = await Task.find({ owner: req.user._id, completed: match.completed}).limit(parseInt(req.query.limit)).skip(parseInt(req.query.skip))
            res.send(task)
        }

    } catch (e) {
        res.status(500).send()
    }
})

router.get('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id

    try {
        //const task = await Task.findById(_id)
        const task = await Task.findOne({ _id, owner: req.user._id })

        if (!task) {
            return res.status(404).send()
        }

        res.send(task)
        
    } catch (e) {
        res.status(500).send() 
    }
})

router.patch('/tasks/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({error: 'Invalid Updates!'})
    }

    try {
        const task = await Task.findOne({ _id: req.params.id, owner:req.user._id})
        
        if (!task) {
            return res.status(404).send()
        }

        updates.forEach((update) => task[update] = req.body[update])
        
        await task.save()

        res.send(task)
    } catch (e) {
        res.status(400).send(e)
    }

})

router.delete('/tasks/:id', auth, async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({ _id: req.params.id, owner:req.user._id})
        
        if (!task) {
            return res.status(404).send()
        }

        res.send(task)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router