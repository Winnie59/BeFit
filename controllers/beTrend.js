const express = require('express')
const router = express.Router()
const BeTrendSeeds = require('../models/beTrend')
const productSeeds = require('../db/beTrend.json')

const authRequired1 = (req,res,next) => {
  if (req.session.loggedIn && req.session.email === '111@gmail.com') {
      next()
  } else {
      res.redirect('/member/login')
  }
}

router.get('/', (req,res) => {
    BeTrendSeeds.find({},(err,products) => {
     res.render('beTrend/trendIndex',{products})   
    })
})

router.get('/new',authRequired1 ,(req,res) => {
  res.render('beTrend/trendNew')
})

router.get('/:id',(req,res) => {
  BeTrendSeeds.findById(req.params.id,(err,product) => {
      res.render('beTrend/trendShow',{product})
  })
})

router.post('/',(req,res) => {
  BeTrendSeeds.create(req.body, (err,createdProduct) => {
    res.redirect('/betrend')
  })
})

router.delete('/:id',authRequired1,(req,res) => {
  BeTrendSeeds.findByIdAndRemove(req.params.id, (err,deleteProduct) => {
    res.redirect('/betrend')
  })
})

router.get('/:id/edit',authRequired1, (req,res) => {
  BeTrendSeeds.findById(req.params.id,(err,product) => {
    res.render('beTrend/trendEdit',{product})
  })
})

router.put('/:id',(req,res) => {
  BeTrendSeeds.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err,updateProduct) => {
    res.redirect('/betrend')
  })
})

router.put('/:id/BUY', (req,res) => {
  BeTrendSeeds.findByIdAndUpdate(req.params.id, {$inc: {qty:-1}}, {new:true}, (err,updateModel) => {
      res.redirect('/betrend')
  })
})


module.exports = router