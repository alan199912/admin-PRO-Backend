const { Schema, model } = require('mongoose')

const UserSchema = Schema({
    name: {
        type: String,
        require: true
    },
    email: { 
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    img: {
        type: String,
    },
    role: {
        type: String,
        require: true,
        default: 'USER_ROLE'
    },
    google: {
        type: Boolean,
        default: false
    },
})

// * properties dont visible into response
UserSchema.method('toJSON', function() {
    const { __v, password,...object } = this.toObject();
    
    return object
})

module.exports = model('User', UserSchema)