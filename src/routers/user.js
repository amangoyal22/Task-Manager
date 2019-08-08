const express  =  require('express')
const router  = new express.Router()
const User = require('../models/user.js')

router.post('/users',async (req,res)=>{
    const user = new User(req.body); 
    try {
        await User.save()
        res.status(201).send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/users',async (req,res)=>{
    try {
        const users = await User.find({});
        res.status(201).send(users)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/users/:id',async (req,res)=>{ 
    const _id = req.params.id
    try {
        const user = await User.findById(_id);
        if(!user) {
            return res.status(404).send(user)
        }
        res.status(201).send(user)
    } catch (e) {
        res.status(400).send(e)
    }

})

router.patch('/users/:id',async (req,res)=>{
    const updates = Object.keys(req.body)
    const allowedUpdate = ['name','password','age','email']

    const isValidOperation = updates.every((update)=>allowedUpdate.includes(update))
    console.log(isValidOperation)
    if(!isValidOperation) {
        return res.status(404).send({ "error" : "can't update the fields"});
    }
    const _id = req.params.id
    try { 
        const user = await User.findByIdAndUpdate(_id,req.body,{new : true, runValidators: true})
        if(!user) {
            return res.status(404).send(user)
        }
        res.status(201).send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})


router.delete('/users/:id',async (req,res)=>{
    const _id = req.params.id
    try { 
        console.log(_id)
        const user = await User.findByIdAndDelete(_id)
        console.log(user)
        if(!user) {
            return res.status(404).send(user)
        }
        res.status(201).send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})



module.exports = router