const express  =  require('express')
const router  = new express.Router()
const Task = require('../models/task.js')

router.get('/tasks',async (req,res)=>{
    try {
        const tasks = await Task.find({});
        res.status(201).send(tasks)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/tasks/:id',async (req,res)=>{ 
    const _id = req.params.id
    try {
        const task = await Task.findById(_id);
        if(!task) {
            return res.status(404).send(task)
        }
        res.status(201).send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.post('/tasks',async (req,res)=>{
    const task = new Task(req.body); 
    try {
        await Task.save(task)
        res.status(201).send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})


router.patch('/task/:id',async (req,res)=>{
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
        const task = await Task.findByIdAndUpdate(_id,req.body,{new : true, runValidators: true})
        if(!task) {
            return res.status(404).send(task)
        }
        res.status(201).send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/task/:id',async (req,res)=>{
    const _id = req.params.id
    try { 
        console.log(_id)
        const task = await Task.findByIdAndDelete(_id)
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