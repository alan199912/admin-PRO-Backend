const { Schema, model } = require('mongoose')

const HospitalSchema = Schema({
    name: {
        type: String,
        require: true
    },
    img: {
        type: String,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        require: true
    }
})

// * properties dont visible into response
HospitalSchema.method('toJSON', function() {
    const { __v,...object } = this.toObject();
    return object
})

module.exports = model('Hospital', HospitalSchema)