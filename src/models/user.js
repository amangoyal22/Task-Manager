const mongoose = require('mongoose');
const validator = require('validator');
const bcrpyt = require('bcryptjs')
const jwt = require('jsonwebtoken') 


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
     unique: true,
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
    },
    tokens : [{
        token : {
            type : String,
            required : true
                }
            }]
})

userSchema.pre('save', async function (next){
    const user = this
    if (user.isModified('password')) {
        user.password = await bcrpyt.hash(user.password,8)
    }
    next()
})

userSchema.statics.findByCred = async (email, password) => {
    const user = await User.findOne({email});
    if(!user) {
        throw new Error('User doesnot Exist')
    }
    const isMatched = await bcrpyt.compare(password,user.password)
    
    if (!isMatched) {
        throw new Error('Wrong Password')
    }
    return user
}


userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, 'thisismynewcourse')

    user.tokens = user.tokens.concat({ token })
    await user.save()

    return token
}

userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()
    delete userObject.password
    delete userObject.tokens
    
    return userObject
}

const User = mongoose.model('User',userSchema)
//userSchema.post()

module.exports = User