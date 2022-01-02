const express = require('express')
const router = express.Router()
const BeTrendSeeds = require('../models/beTrend')
const productSeeds = require('../db/beTrend.json')

router.get('/seed', async (req, res) => {
    try {
    const seedItems = await BeTrendSeeds.create(productSeeds)
    res.send(seedItems)
  } catch (err) {
    res.send(err.message)
  }
})

router.get('/', (req,res) => {
    BeTrendSeeds.find({},(err,products) => {
     res.render('beTrend/trendIndex',{products})   
    })
})

module.exports = router