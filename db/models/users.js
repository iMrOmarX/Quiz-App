const mongoose = require("mongoose")
const { default: validator } = require("validator")


const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    questionsAdded: {
        type: Number,
        default: 0
    },
    bestScore : {
        type: Number,
        default: 0
    },
    email: {
        type : String, 
        required: true, 
        unique: true ,
        trim: true ,
        lowercase: true,
        validate(value) {
            if(!validator.isEmail(value)){
                throw new Error("Email is invalid")
            }
        }
    },
    password: {
        type: String, 
        trim: true, 
        required: true,
        validate(value) {
            if(value.toLowerCase().includes("password")) {
                throw new Error("password is invalid")
            }
        },
        minlength: 7
    },
    tokens: [{
        token: {
            type: String,
            required: true
        } 
    }]
})

userSchema.statics.findByCredintials = async (email , password) => {
    
}

const User = mongoose.model("user" , userSchema)


module.exports = User