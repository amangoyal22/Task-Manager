const express  =  require('express')
const router  = new express.Router()
const Task = require('../models/task.js')
const auth = require('../middleware/auth.js')


//create task
router.post('/tasks',auth,async (req,res)=>{
    
    const task = new Task({
        ...req.body,
        owner : req.user._id
    })
    try {
        await task.save(task)
        res.status(201).send(task)
    } catch (e) {
        console.log(e)
        res.status(400).send(e)
    }
})

// specific task
router.get('/tasks/:id',auth,async (req,res)=>{ 
    const _id = req.params.id
    try {
        //const task = await Task.findById(_id);
        //const task = await Task.findOne({_id,owner: req.user._id})
        await req.user.populate('tasks').execPopulate()
        if(!task) {
            return res.status(404).send(req.user.tasks)
        }
        res.status(201).send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})

//task list
router.get('/tasks',auth, async (req,res)=>{
    try {
        const tasks = await Task.find({owner : req.user._id});
        res.status(201).send(tasks)
    } catch (e) {
        res.status(400).send(e)
    }
})

// update
router.patch('/task/:id',auth,async (req,res)=>{
    const updates = Object.keys(req.body)
    const allowedUpdate = ['completed','description']

    const isValidOperation = updates.every((update)=>{
        return allowedUpdate.includes(update)
    })
    
    if(!isValidOperation) {
        return res.status(404).send({error : "can't update the fields"});
    }
    const _id = req.params.id
    try { 
        const task = await Task.findOne({_id,owner: req.user._id})
        //const task = await Task.findById(_id);

        //const task = await Task.findByIdAndUpdate(_id,req.body,{new : true, runValidators: true})
        if(!task) {
            console.log(task)
            return res.status(404).send(task)
        }

        updates.forEach((update) => {
            task[update] = req.body[update]
        })
        task.save(req.body)
        res.status(201).send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})

//delete 
router.delete('/task/:id',auth,async (req,res)=>{
    const _id = req.params.id
    try { 
        console.log(_id)
        const task = await Task.findOneAndDelete({_id,owner: req.user._id})
        console.log(task)
        if(!task) {
            return res.status(404).send("task is not existing")
        }
        res.status(201).send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})

module.exports = router