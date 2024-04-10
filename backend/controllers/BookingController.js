const AppError = require('../utils/Error')
const {checkasync} = require('./UserController')
const dotenv = require('dotenv')
dotenv.config({path:'../.env'})
const stripe = require('stripe')(process.env.stripe_secret)
const Hotel = require('../models/HotelModel')
module.exports.checkoutSession = checkasync(async(req,res,next)=>{
    const id = req.params.id
    let hotel = await Hotel.findById(id);
    const session = await stripe.checkout.session.create({
        payment_method_types:['card'],
        success_url:'http://localhost:5173/',
        cancle_url:'http://localhost:5173/login',
        customer_email:req.user.email,
        client_reference_id:req.params.id,
        line_items:[
            {...hotel}
        ]
    })

    res.status(200).json({
     status:'success',
     session
    })
})

