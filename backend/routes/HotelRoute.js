const express= require('express')
const HotelR = express.Router()
const {RegisterHotel, GetHotels,getSingelHotel, verifyHotel,uploadCover,uploadPhotos,deletePhoto,uploadPhoto,Updatehotel, deleteHotel, addLIke,dislike, likedHotel} = require('../controllers/Hotelcontrollers')
const {protected,restriTO} = require('../controllers/UserController')
const {upload,multiUpload} = require('../middleware/multer')
HotelR.route('/').post(protected,RegisterHotel).get(GetHotels)
HotelR.route('/:id').get(getSingelHotel)

HotelR.route('/verify/:id').get(protected,restriTO('admin'),verifyHotel)
HotelR.route('/uploadCover/:id').patch(protected,upload,uploadCover)
HotelR.route('/UploadPhoto/:id').patch(protected,multiUpload,uploadPhotos)
HotelR.route('/deletephoto/:id').patch(protected,restriTO('admin','owner'),deletePhoto)
HotelR.route('/updateHotel/:id').patch(protected,restriTO('admin','owner'),Updatehotel)
HotelR.route('/deleteHotel/:id').delete(protected,restriTO('owner','admin'),deleteHotel)
HotelR.route('/uploadPhoto').post(protected,upload,uploadPhoto)
HotelR.route('/addLike/:id').patch(protected,addLIke)
HotelR.route('/disLike/:id').patch(protected,dislike);
HotelR.route('/likedHotel').get(protected,likedHotel);

module.exports = HotelR