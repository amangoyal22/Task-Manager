const mongoose = require('mongoose');
const validator = require('validator');


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

module.exports = User