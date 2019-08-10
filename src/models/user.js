const mongoose = require('mongoose');
const validator = require('validator');
const bcrpyt = require('bcryptjs')

const userSchema = new mongoose.Schema({
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

userSchema.pre('save', async function (next){
    const user = this
    if (user.isModified('password')) {
        user.password = await bcrpyt.hash(user.password,8)
    }
    next()
})
const User = mongoose.model('User',userSchema)
//userSchema.post()

module.exports = User