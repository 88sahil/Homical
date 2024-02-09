const express = require('express')
const App = express()
const dotenv= require('dotenv')
const mongoose = require('mongoose')
const GlobalErrorhandel = require('./utils/GlobalErrorhandle')
const UserRoute = require('./routes/userroute')
const cookieparser = require('cookie-parser')
dotenv.config({path:'./.env'})
App.use(express.json())
App.use(cookieparser())
//ANCHOR - mongodb connection
let db = process.env.mongo_string
db = db.replace('<password>',process.env.mongo_pass)
mongoose.connect(db).then((con)=>{
    console.log("database connected successfully🎉")
}).catch((err)=>{
    console.log(err)
})

//ANCHOR - main routes start from here
App.use('/api/user',UserRoute)
App.use(GlobalErrorhandel)
const port = process.env.PORT || 8000
App.listen(port,()=>{
    console.log(`someone is looking for you at ${port}`)
})