require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const SESSION_SECRET = process.env.SESSION_SECRET
const PORT = process.env.PORT || 5009
const methodOverride = require('method-override')
const expressEjsLayout = require('express-ejs-layouts')

app.use(cors())
const beFitCreateController = require('./controllers/beFit')
const starterController = require('./controllers/starter')
const strongController = require('./controllers/strong')
const superController = require('./controllers/super')
const beTrendController = require('./controllers/beTrend')
const memberController = require('./controllers/member')
const profileController = require('./controllers/profile')

const session = require('express-session')



app.use(express.static('public'))
app.use(methodOverride('_method'))

app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use(expressEjsLayout)
app.set('view engine', 'ejs')

app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
}))

app.use((req,res,next) => {
    res.locals.email = req.session.email
    res.locals.username = req.session.username
    res.locals.loggedIn = req.session.loggedIn
    res.locals.userId = req.session.userId
    next()
})

app.use((req,res,next) => {
    res.locals.message = req.session.message
    req.session.message = ""
    next()
})
app.use('/', profileController)
app.use('/befit', beFitCreateController)
app.use('/starter', starterController)
app.use('/strong', strongController)
app.use('/super', superController)
app.use('/betrend', beTrendController)
app.use('/member', memberController)

app.get('/setCookie/:data', (req,res) => {
    req.session.data =req.params.data
    res.send("session data set")
})

app.get ('/getSessionInfo', (req,res) => {
    res.send(req.session.data)
})


app.listen(PORT,() => {
    console.log(`✅ PORT: ${PORT} 🌟`)
})