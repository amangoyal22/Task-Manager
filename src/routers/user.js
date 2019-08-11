const express  =  require('express')
const router  = new express.Router()
const User = require('../models/user.js')
const auth = require('../middleware/auth.js')


router.get('/users/me', auth, async (req,res)=>{
    // try {
    //     const users = await User.find({});
    //     res.status(201).send(users)
    // } catch (e) {
    //     res.status(400).send(e)
    // }
    res.send(req.user)
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
        const user = await User.findById(_id);
        updates.forEach((update) => {
            user[update] = req.body[update]
        })
        await 
        user.save()
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

//sign in
router.post('/users/login',async(req,res)=>{
    try {
        const user = await User.findByCred(req.body.email,req.body.password);
        const jwt  = await user.generateAuthToken();
        res.send({user,jwt })
        } catch (e) {
        console.log(e)
        res.status(404).send(e)
        }
    })

//sign up
router.post('/users',async (req,res)=>{
    const user = new User(req.body); 
    try {
        await user.save()
        const token  = await user.generateAuthToken()
        res.status(201).send({user,token})
    } catch (e) {
        console.log(e)
        res.status(400).send(e)
    }
})

router.post('/users/logout',auth,async(req,res)=>{
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()
        res.send(req.user)
        } catch (e) {
        console.log(e)
        res.status(404).send(e)
        }
    })


module.exports = router