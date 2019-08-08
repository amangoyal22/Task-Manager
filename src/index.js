const express  =  require('express')
const app = express()
const port = process.env.PORT || 3000

app.listen(port,()=>{
    console.log('server is running on port '  + port)
})

require('./db/mongoose.js')
const userRouter = require('./routers/user.js')
const taskRouter = require('./routers/task.js')

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)