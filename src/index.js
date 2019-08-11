const express  =  require('express')
const app = express()
const port = process.env.PORT || 3000

require('./db/mongoose.js')
const userRouter = require('./routers/user.js')
const taskRouter = require('./routers/task.js')
const Task = require('./models/task.js')
const User = require('./models/user.js')


// app.use((req,res,next)=>{
//     console.log(req.method,req.path)
//     if(req.method === 'GET') {
//         res.send(req.method,req.path)
//     } else{s
//         next()
//     }
// })

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)



app.listen(port,()=>{
    console.log('server is running on port '  + port)
})

// const jwt = require('jsonwebtoken') 

// const myFuntion  = async () => {
//     const token = jwt.sign({_id :'123'},'thisismynewcourse',{expiresIn : '10 seconds'})
//     console.log(token)
//     const payLoad = jwt.verify(token,'thisismynewcourse')
//     console.log(payLoad)
// }

const myFuntion  = async () => {
//    const task = await Task.findById('5d505a586a0fe65654dffde6')
//    await task.populate('owner').execPopulate()
//    console.log(task)
    const user = await User.findById('5d5056b909cd9c522c845992')
    await user.populate('tasks').execPopulate()
    console.log(user.tasks)
}

myFuntion();
