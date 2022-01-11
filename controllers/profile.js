const express = require('express')
const router = express.Router()
const Profile = require('../models/UserProfile')
const User = require('../models/user')

const authRequired = (req,res,next) => {
    if (req.session.loggedIn) {
        next()
    } else {
        res.redirect('/member/login')
    }
}

router.get('/home', (req,res) => {
    res.render('home')
})

router.get('/about', (req,res) => {
    res.render('about')
})

router.get('/profile',authRequired, (req,res) => {
    Profile.find({},(err,profiles) => {
        console.log(req.body)
        res.render('profile/profile',{profiles: profiles})
    })
})

router.get('/profile/new',authRequired,(req,res) => {
    res.render('profile/newProfile')
})

router.post('/profile', async (req, res, next) => {
	try {

		// Define user 
		let currentUser = await User.findById(req.session.userId)

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
			res.json({
				data: newPost,				
				message: `Post has been added` 
			})
		}  
		else {
			res.json({
				message: `Please log in first to add post`
			})
		}
	}
	catch(err) {
		next(err)
	}
})


// router.post('/profile', async(req,res,next) => {
//     try{
//         const currentUser = await User.findOne({username: req.body.username})
//         if(req.session.loggedIn == true) {
//             const newPost = await Profile.create(req.body)
//             req.session.username = currentUser.username
//             req.session.message = 'Post has been added'
//             res.redirect('/profile')
//         } else{
//             req.session.message = 'Please log in first to add post'
//             res.redirect('/member/login')
//         }
//     } catch (err) {
//         next(err)
//     }
// })

// router.post('/profile', (req,res) => {
//     Profile.create(req.body, (err,createProfile) => {
//         res.redirect('/profile')
//     })
// })

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