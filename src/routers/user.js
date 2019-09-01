const express  =  require('express')
const multer = require('multer')
const router  = new express.Router()
const User = require('../models/user.js')
const auth = require('../middleware/auth.js')
const sharp = require('sharp')

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


// profile
router.get('/users/me', auth, async (req,res)=>{
    // try {
    //     const users = await User.find({});
    //     res.status(201).send(users)
    // } catch (e) {
    //     res.status(400).send(e)
    // }
    res.send(req.user)
})

//update
router.patch('/users/me',auth,async (req,res)=>{
    const updates = Object.keys(req.body)
    const allowedUpdate = ['name','password','age','email']
    const isValidOperation = updates.every((update)=>allowedUpdate.includes(update))
    console.log(isValidOperation)
    if(!isValidOperation) {
        return res.status(404).send({ "error" : "can't update the fields"});
    }
    //const _id = req.params.id
    try { 
        //const user = await User.findById(_id);
        updates.forEach((update) => {
            req.user[update] = req.body[update]
        })
        await req.user.save()
        // if(!user) {
        //     return res.status(404).send(user)
        // }
        res.status(201).send(req.user)
    } catch (e) {
        res.status(400).send(e)
    }
})

//delete
router.delete('/users/me',auth,async (req,res)=>{
    const _id = req.params.id
    try { 
        // console.log(_id)
        // const user = await User.findByIdAndDelete(req.user._id)
        // console.log(user)
        // if(!user) {
        //     return res.status(404).send(user)
        // }
        await req.user.remove()
        
        res.status(201).send(req.user)
    } catch (e) {
        console.log(e)
        res.status(400).send(e)
    }
})


//logout
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



const upload = multer({
    limits : {
        fileSize : 10000000
    },fileFilter(req,file,cb){
         if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
              cb(new Error('File should an image'))
         } 
         cb(undefined,true)
    }
})

router.post('/users/me/avatar', auth, upload.single('avatar'), async (req, res) => {
    const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer()
    req.user.avatar = buffer
    await req.user.save()
    res.send()
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
})

router.delete('/users/me/avatar', auth ,(req,res) => {
    req.user.avatar = undefined
    await = req.user.save()
    res.send()
},(error,req,res,next) => {
    res.status(400).send({error : error.message})
})

router.get('/users/:id/avatar', async (req,res)=>{
    try {
        const user = await User.findById(req.params.id)
        if (! user || !user.avatar ) {
            throw new Error();
        }

        res.set('Content-Type','image/png')
        res.send(user.avatar)

    } catch (e){
        res.status(404).send();
    }
})

module.exports = router

//see any profile
// router.get('/users/:id',async (req,res)=>{ 
//     const _id = req.params.id
//     try {
//         const user = await User.findById(_id);
//         if(!user) {
//             return res.status(404).send(user)
//         }
//         res.status(201).send(user)
//     } catch (e) {
//         res.status(400).send(e)
//     }

// })
