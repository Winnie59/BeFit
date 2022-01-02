const express = require('express')
const router = express.Router()
const StrongPlan = require('../models/strongP')
const strongPlanSeeds = require('../db/strong.json')

router.get('/seed', async (req, res) => {
    try {
    const seedItems = await StrongPlan.create(strongPlanSeeds)
    res.send(seedItems)
  } catch (err) {
    res.send(err.message)
  }
})

router.get('/', (req,res) => {
    StrongPlan.find({},(err,strongs) => {
        res.render('strong',{strongs})
    })
})

router.delete('/:id', (req,res) => {
    StrongPlan.findByIdAndRemove(req.params.id, (err,deleteWorkout) => {
        res.redirect('/strong', {strong})
    })
})

module.exports = router