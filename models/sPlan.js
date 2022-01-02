const mongoose = require('../db/connection')

const sPlanSchema = new mongoose.Schema({
    focus: {type:String, required:true},
    workout: [String],
    note: String,
})

const StarterPlan = mongoose.model('StarterPlan', sPlanSchema)

module.exports = StarterPlan

