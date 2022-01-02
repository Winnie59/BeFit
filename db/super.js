const mongoose = require('./connection')
const SuperPlan = require('../models/superP')
const superPlanSeeds = require('./super.json')

WorkoutPlan.deleteMany({})
.then(()=>{
    return WorkoutPlan.insertMany(superPlanSeeds)
})
.then(data => console.log(data))
.catch(err=>console.log(err))
.finally(()=>{
    process.exit()
})