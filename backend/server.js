const express = require('express')
const app = express()
const mongoose = require('mongoose')

const port = 3000



mongoose.connect('mongodb://localhost/PodcastBuilder')
.then(
    app.listen(3000)
).catch(err=>{
    console.log(err)
})
