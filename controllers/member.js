const express = require('express')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const router = express.Router()

router.get('/signup', (req,res) => {
    res.render('member/signUp')
})

router.post('/signup', async (req,res,next) => {
    try {
        if(req.body.password === req.body.verifyPassword) {
            const desireUsername = req.body.username 
            const desireEmail = req.body.email
            const userExists = await User.findOne({username: desireUsername})
            const emailExists = await User.findOne({email: desireEmail})
            if (userExists || emailExists) {
                req.session.message = 'Username or Email had already taken'
                res.redirect('/member/signup')
            } else {
                const salt = bcrypt.genSaltSync(10)
                const hashedPassword = bcrypt.hashSync(req.body.password, salt)
                req.body.password = hashedPassword
                req.body.verifyPassword = hashedPassword
                const createdUser = await User.create(req.body)
                req.session.email = createdUser.email
                req.session.username = createdUser.username
                req.session.loggedIn = true
                req.session.userId = createdUser._id
                res.redirect('/profile')
            }
        } else {
            req.session.message = 'Password must match'
            res.redirect('/member/signup')
        }
    } catch (err) {
        next(err)
    }
})

router.get('/login', (req,res) => {
    res.render('member/login')
})

router.post('/login',async (req,res,next) => {
    try {
        const emailToLogin = await User.findOne({email: req.body.email})
        const userToLogin = await User.findOne({username: req.body.username})
        if (userToLogin && emailToLogin) {
            const validPassword = bcrypt.compareSync(req.body.password,  userToLogin.password)
            if (validPassword) {
                req.session.email = userToLogin.email
                req.session.username = userToLogin.username
                req.session.loggedIn = true
                req.session.userId = userToLogin._id
                res.redirect('/profile')
            } else {
                req.session.message = 'Invaild Email, Username or Password'
                res.redirect('/member/login')
            }
        } else {
            req.session.message = 'Invalid Email, Username or Password'
            res.redirect('/member/login')
        }
    } catch (err) {
        next(err)
    }
})

router.get('/logout', (req,res) => {
    req.session.destroy()
    res.redirect('/member/login')
})


module.exports = router