const mongoose = require('../db/connection')

const fitSchema = new mongoose.Schema({
    workout: [String],
    focus: {type:String, required:true},
    set: [Number],
    rep: [Number],
    weight: [Number],
    day:String,
    date: String,
    note: String,
    profile: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Profile'
    }
    
})

const Workout = mongoose.model('Workout', fitSchema)

module.exports = Workout
