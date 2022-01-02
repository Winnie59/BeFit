const mongoose = require('./connection')
const StrongPlan = require('../models/strongP')
const strongPlanSeeds = require('./strong.json')

WorkoutPlan.deleteMany({})
.then(()=>{
    return WorkoutPlan.insertMany(strongPlanSeeds)
})
.then(data => console.log(data))
.catch(err=>console.log(err))
.finally(()=>{
    process.exit()
})