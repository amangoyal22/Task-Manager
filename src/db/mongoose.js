const mongoose = require('mongoose');
const validator = require('validator');

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
    useCreateIndex:true
});

const User = mongoose.model('User',{
    name : {
        type : String,
        required: true,
        trim: true
    },
    age : {
        type : Number,
        default : 0 
    },
    email : {
     type : String,
     required : true,
     trim : true,
     lowercase : true,
     validate(value){
         if(!validator.isEmail(value)){
            throw new Error('Invalid Email');
         }
     }
    },
    password : {
        type : String,
        required : true,
        trim : true,
        minlength : 7,
        validate(value) {
            if (value.toLowerCase().includes("password")){
                throw new Error("Can't be Password");
            } 
        } 
    }
})

// const me = new User({name : '1Aman2', email:" 1Aaman@gmail.com",password: "qwertyuiop"})
// me.save().then((me)=>{
//     console.log(me)
// }).catch((error)=>{
//     console.log(error)
// })

const task = mongoose.model('Task',{
    description : {
        type : String,
        required: true,
        trim : true
    },
    completed : {
        type : Boolean,
        default : false
    }
})

const task1 = new task({
    description : " Eat Dinner",
})

task1.save().then((task1)=>{
    console.log(task1)
}).catch((error)=>{
    console.log(error)
})

