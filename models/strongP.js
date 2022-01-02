const mongoose = require('../db/connection')

const sPlanSchema = new mongoose.Schema({
    focus: {type:String, required:true},
    workout: [String],
    note: String,
})


const StrongPlan = mongoose.model('StrongPlan', sPlanSchema)



module.exports = StrongPlan
