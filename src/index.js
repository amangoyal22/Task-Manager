const express  =  require('express')
const app = express()
const port = process.env.PORT || 3000

require('./db/mongoose.js')
const userRouter = require('./routers/user.js')
const taskRouter = require('./routers/task.js')

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)



app.listen(port,()=>{
    console.log('server is running on port '  + port)
})


// const myFuntion  = async () => {
//     const pass = 'hello'
//     const encpass = await bcrpyt.hash(pass,8)
//     console.log(encpass)
//     const isMatch = await bcrpyt.compare('pass',encpass)
//     console.log(isMatch)
// }

// myFuntion();