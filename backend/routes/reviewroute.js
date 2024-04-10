const express = require('express');
const ReviewRoute = express.Router();
const {protected} = require('../controllers/UserController')
const {createReview,deleteReview} = require('../controllers/ReviewController')

ReviewRoute.route('/:hotelId').post(protected,createReview)
ReviewRoute.route('/delete/:reviewId').patch(deleteReview)

module.exports = ReviewRoute