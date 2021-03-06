const mongoose = require('../db/connection')

const userProfile = new mongoose.Schema({
    name: String,
    status: String,
    weight: Number,
    height: Number,
    age: Number,
    profileImg: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    recentWorkout: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Workout'
    }]
})

const Profile = mongoose.model('Profile', userProfile)

module.exports = Profile