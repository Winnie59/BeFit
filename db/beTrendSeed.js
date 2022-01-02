const mongoose = require('./connection')
const BeTrendSeeds = require('../models/beTrend')
const productSeeds = require('./beTrend.json')


BeTrendSeeds.deleteMany({})
.then(()=>{
    return productSeeds.insertMany(productSeeds)
})
.then(data => console.log(data))
.catch(err=>console.log(err))
.finally(()=>{
    process.exit()
})