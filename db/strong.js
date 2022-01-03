const mongoose = require('./connection')
const StrongPlan = require('../models/strongP')
const strongPlanSeeds = require('./strong.json')

StrongPlan.deleteMany({})
.then(()=>{
    return StrongPlan.insertMany(strongPlanSeeds)
})
.then(data => console.log(data))
.catch(err=>console.log(err))
.finally(()=>{
    process.exit()
})