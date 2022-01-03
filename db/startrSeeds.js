const mongoose = require('./connection')
const StarterPlan = require('../models/sPlan')
const starterPlanSeeds = require('./starter.json')

StarterPlan.deleteMany({})
.then(()=>{
    return StarterPlan.insertMany(starterPlanSeeds)
})
.then(data => console.log(data))
.catch(err=>console.log(err))
.finally(()=>{
    process.exit()
})