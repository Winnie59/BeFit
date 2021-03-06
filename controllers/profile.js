const express = require('express')
const router = express.Router()
const Profile = require('../models/UserProfile')
const User = require('../models/user')
const Workout = require('../models/fits')

const authRequired = (req,res,next) => {
    if (req.session.loggedIn) {
        next()
    } else {
        res.redirect('/member/login')
    }
}

router.get('/', (req,res) => {
    res.render('home')
})

router.get('/about', (req,res) => {
    res.render('about')
})

router.get('/befit', (req,res) => {
    res.render('beFit/befit')
})

router.get('/profile',authRequired, async (req,res) => {
    const profiles = await Profile.find({user: req.session.userId})
    res.render('profile/profile',{profiles})
})

router.get('/profile/new',authRequired,(req,res) => {
    res.render('profile/newProfile')
})

router.post('/profile', async (req, res, next) => {
	try {

		const currentUser = await User.findById(req.session.userId)

		const createNewPost = ({
			name: req.body.name,
            status: req.body.status,
            weight: req.body.weight,
            height: req.body.height,
            age: req.body.age,
			profileImg: req.body.profileImg,
			user: currentUser
		})

		if (req.session.loggedIn == true) {
			const newPost = await Profile.create(createNewPost)
            res.redirect('/profile')
		}  
		else {
            res.redirect('/member/login')
		}
	}
	catch(err) {
		next(err)
	}
})

router.delete('/profile/:id',authRequired, (req,res)=>{
    Profile.findByIdAndRemove(req.params.id, (err, deletedProfile)=>{
        res.redirect('/profile')
    })
})

router.put('/profile/:id',(req,res) => {
    Profile.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err,updateProfile) => {
        res.redirect('/profile')
    })
})

router.get('/profile/:id/edit',authRequired,(req,res) => {
    Profile.findById(req.params.id,(err,profile) => {
        res.render('profile/editProfile',{profile})
    })
})

module.exports = router