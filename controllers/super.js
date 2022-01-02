const express = require('express')
const router = express.Router()
const SuperPlan = require('../models/superP')
const superPlanSeeds = require('../db/super.json')

router.get('/seed', async (req, res) => {
    try {
    const seedItems = await SuperPlan.create(superPlanSeeds)
    res.send(seedItems)
  } catch (err) {
    res.send(err.message)
  }
})

router.get('/', (req,res) => {
    SuperPlan.find({},(err,supers) => {
        res.render('super',{supers})
    })
})

router.get('/:id',(req,res) => {
    SuperPlan.findByIdAndRemove(req.params.id, (err,deleteWorkout) => {
        res.redirect('super',{superPlan})
    })
})
module.exports = router