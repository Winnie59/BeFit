require('dotenv').config()
const express = require('express')
const app = express()
const { PORT } = process.env
const methodOverride = require('method-override')
const expressEjsLayout = require('express-ejs-layouts')
const beFitCreateController = require('./controllers/beFit')
const starterController = require('./controllers/starter')
const strongController = require('./controllers/strong')
const superController = require('./controllers/super')

app.use(express.static('public'))
app.use(methodOverride('_method'))

app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use(expressEjsLayout)
app.set('view engine', 'ejs')

app.use('/befit', beFitCreateController)
app.use('/starter', starterController)
app.use('/strong', strongController)
app.use('/super', superController)


app.listen(PORT,() => {
    console.log(`✅ PORT: ${PORT} 🌟`)
})