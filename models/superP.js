const mongoose = require('../db/connection')

const sPlanSchema = new mongoose.Schema({
    focus: {type:String, required:true},
    workout: [String],
    note: String,
})


const SuperPlan = mongoose.model('SuperPlan', sPlanSchema)


module.exports = SuperPlan