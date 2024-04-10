const {checkasync} = require('./UserController')
const Review = require('../models/ReviewModel')
const AppError = require('../utils/Error')


const createReview = checkasync(async(req,res,next)=>{
    const hotelId = req.params.hotelId;
    const review = {...req.body,author:req.user._id,hotelid:hotelId};
    let creview = await Review.create(review);
    res.status(201).json({
        status:'success',
        review:creview
    })

})
const deleteReview = checkasync(async(req,res,next)=>{
    let id = req.params.reviewId
    let rev = await Review.findByIdAndDelete(id);
    res.status(200).json({
        status:'success'
    })
})
module.exports= {createReview,deleteReview}