import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    }
}, {
    timestamps: true
})

// comparing password with input password
userSchema.methods.matchPassword =  function(enteredPassword) {
    return bcrypt.compare(enteredPassword, this.password)
}

// encrypt resgistered users password
userSchema.pre('save', function(next){
    if(!this.isModified('password')) {
        next()
    }
    const salt = bcrypt.genSalt(10)
    this.password = bcrypt.hash(this.password, salt)
})

const User = mongoose.model('User', userSchema)

export default User