const express = require('express')
const router = express.Router()
const Workout = require('../models/fits')
const Profile = require('../models/UserProfile')


const authRequired = (req,res,next) => {
    if (req.session.loggedIn) {
        next()
    } else {
        res.redirect('/member/login')
    }
}

router.get('/:id/create',authRequired,async (req,res) => {
  const profile =  await  Profile.findById(req.params.id)
  const workouts = await Workout.find({profile: req.params.id})
        res.render('beFit/index',{profile,workouts})
})

router.get('/:id/new',authRequired , async(req,res) => {
    const profile = await Profile.findById(req.params.id)
       res.render('beFit/new',{profile})   
        
})

router.post('/:id', (req,res) => {
    req.body.profile = req.params.id
    Workout.create(req.body)
    res.redirect(`/befit/${req.params.id}/create`)   
})

router.delete('/create/:id/:workoutId',authRequired,async (req,res) => {
    const profile =  await  Profile.findById(req.params.id)
    const workout = await Workout.findOneAndRemove({profile: req.params.id})
        res.redirect(`/befit/${profile._id}/create`)
})

router.put('/create/:id/:workoutId', async(req,res) => {
    req.body.profile = req.params.id
    const workout = await Workout.findOneAndUpdate({profile: req.params.id}, req.body, {new: true})
        res.redirect(`/befit/${req.params.id}/create`)
})

router.get('/create/:id/:workoutId/edit',authRequired, async(req,res) => {
    const profile =  await  Profile.findById(req.params.id)
    const workout = await Workout.find({profile: req.params.id})
        res.render('beFit/edit',{workout,profile})
})

module.exports = router