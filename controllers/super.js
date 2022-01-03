const express = require('express')
const router = express.Router()
const SuperPlan = require('../models/superP')
const superPlanSeeds = require('../db/super.json')

router.get('/', (req,res) => {
    SuperPlan.find({},(err,supers) => {
        res.render('super',{supers})
    })
})

router.delete('/:id', (req,res) => {
    SuperPlan.findByIdAndRemove(req.params.id, (err,deleteWorkout) => {
        res.redirect('/super')
    })
})

module.exports = router