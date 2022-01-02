const express = require('express')
const router = express.Router()
const StarterPlan = require('../models/sPlan')
const starterPlanSeeds = require('../db/starter.json')

router.get('/seed', async (req, res) => {
    try {
    const seedItems = await StarterPlan.create(starterPlanSeeds)
    res.send(seedItems)
  } catch (err) {
    res.send(err.message)
  }
})

router.get('/', (req,res) => {
    StarterPlan.find({},(err,starters) => {
        res.render('starter',{starters})
    })
})

router.delete('/:id', (req,res) => {
    StarterPlan.findByIdAndRemove(req.params.id, (err,deleteWorkout) => {
        res.redirect('/starter', {starter})
    })
})


module.exports = router