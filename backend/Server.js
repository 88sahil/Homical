const express = require('express')
const App = express()
const dotenv= require('dotenv')
const mongoose = require('mongoose')
const GlobalErrorhandel = require('./utils/GlobalErrorhandle')
const UserRoute = require('./routes/userroute')
const cookieparser = require('cookie-parser')
const passport = require('passport')
const googleStrategy = require('passport-google-oauth2').Strategy
const User= require('./models/usermodel')
const session = require('express-session')
const HotelR = require('./routes/HotelRoute')
const ReviewRoute = require('./routes/reviewroute')
const Booking = require('./routes/bookingroute')
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
//ANCHOR - google auth starts here
App.use(session({
    secret:'hellosahil',
    resave:false,
    saveUninitialized:false
}))
App.use(passport.initialize())
App.use(passport.session())
passport.use(new googleStrategy({
    clientID:process.env.google_clientId,
    clientSecret:process.env.google_clientsecret,
    callbackURL:process.env.google_callback 
},
    async function(accesstoken,refreshToken,profile,done){
        const user = await User.findOrCreate({
            name:profile.name,
            googleId:profile.Id,
            photo:profile.picture[0],
            email:profile.email,
            username:profile.displayname
        })

        done(null,user)
    }
))
passport.serializeUser((user,done)=>{
    done(null,user)
})
passport.deserializeUser((user,done)=>{
    done(null,user)
})

App.get('/auth/google',passport.authenticate('google',{
    scope:['email','profile']
}))
App.get('/auth/google/callback',passport.authenticate('google',{
    successRedirect:"/",
    failureRedirect:'/login'
}))

//ANCHOR - main routes start from here
App.use('/api/user',UserRoute)
App.use('/api/Hotel',HotelR)
App.use('/api/Review',ReviewRoute)
App.use('/api/Booking',Booking)
App.use(GlobalErrorhandel)
const port = process.env.PORT || 8000
App.listen(port,()=>{
    console.log(`someone is looking for you at ${port}`)
})