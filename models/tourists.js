const mongoose = require('mongoose')

const travellerSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    age: {
        type: Number,
        required: true
    },
    visitedDate: {
        type: Date,
        required: true,
        default: Date.now
    }
})

module.exports = mongoose.model('travelMan', travellerSchema)