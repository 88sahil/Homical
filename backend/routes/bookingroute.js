const express= require('express');
const Booking = express.Router();
const {protected} = require('../controllers/UserController')
const BookingController = require('../controllers/BookingController')
Booking.route('/check-out/:id').get(protected,BookingController.checkoutSession)
module.exports = Booking