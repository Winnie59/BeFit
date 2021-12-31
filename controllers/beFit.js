const express = require('express')
const router = express.Router()
const Workout = require('../models/fits')

router.get('/', (req,res) => {
    res.render('befit')
})

router.get('/create', (req,res) => {
    Workout.find({},(err,workouts) => {
        res.render('index',{workouts})
    })
})

router.get('/create/new',(req,res) => {
    res.render('new')
})

router.post('/create', (req,res) => {
    Workout.create(req.body, (err,createWorkout) => {
        res.redirect('/befit/create')
    })
})

router.delete('/create/:id', (req,res) => {
    Workout.findByIdAndRemove(req.params.id, (err,deleteWorkout) => {
        res.redirect('/befit/create')
    })
})

router.put('/create/:id',(req,res) => {
    Workout.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err,updateWorkout) => {
        res.redirect('/befit/create')
    })
})

router.get('/create/:id/edit',(req,res) => {
    Workout.findById(req.params.id,(err,workout) => {
        res.render('edit',{workout})
    })
})

module.exports = router