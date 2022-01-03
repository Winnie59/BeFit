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

router.get('/:id',(req,res) => {
  BeTrendSeeds.findById(req.params.id,(err,product) => {
      res.render('beTrend/trendShow',{product})
  })
})

module.exports = router