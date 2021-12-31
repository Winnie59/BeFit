const mongoose = require('mongoose')

const {MONGODB_URI} = process.env

mongoose.connect( MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

.then(instance => 
    console.log(`Connected to db: ${instance.connections[0].name}`))
.catch(err => 
    console.log(`Connection failed`, err))

module.exports = mongoose