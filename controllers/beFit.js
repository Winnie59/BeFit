const express = require('express')
const router = express.Router()
const Workout = require('../models/fits')

const authRequired = (req,res,next) => {
    if (req.session.loggedIn) {
        next()
    } else {
        res.redirect('/member/login')
    }
}

router.get('/', (req,res) => {
    res.render('beFit/befit')
})

router.get('/create', (req,res) => {
    Workout.find({},(err,workouts) => {
        res.render('beFit/index',{workouts})
    })
})

router.get('/create/new',authRequired,(req,res) => {
    res.render('beFit/new')
})

router.post('/create', (req,res) => {
    Workout.create(req.body, (err,createWorkout) => {
        res.redirect('/befit/create')
    })
})

router.delete('/create/:id', authRequired,(req,res) => {
    Workout.findByIdAndRemove(req.params.id, (err,deleteWorkout) => {
        res.redirect('/befit/create')
    })
})

router.put('/create/:id',(req,res) => {
    Workout.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err,updateWorkout) => {
        res.redirect('/befit/create')
    })
})

router.get('/create/:id/edit',authRequired,(req,res) => {
    Workout.findById(req.params.id,(err,workout) => {
        res.render('beFit/edit',{workout})
    })
})

module.exports = router