const express = require('express')
const router = express.Router()
const StrongPlan = require('../models/strongP')
const strongPlanSeeds = require('../db/strong.json')

router.get('/', (req,res) => {
    StrongPlan.find({},(err,strongs) => {
        res.render('strong',{strongs})
    })
})

router.delete('/:id', (req,res) => {
    StrongPlan.findByIdAndRemove(req.params.id, (err,deleteWorkout) => {
        res.redirect('/strong')
    })
})

module.exports = router