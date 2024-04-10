
const Hotel = require('../models/HotelModel')
const AppError= require('../utils/Error')
const {checkasync} = require('./UserController')
const {cloudupload,clouddelete} = require('../utils/Upload')
const User = require('../models/usermodel')
const fs = require('fs')
const apiFeatures= require('../utils/api-featurs')
//Register

const RegisterHotel =checkasync(async(req,res,next)=>{
    let data = req.body
    data.owner = req.user._id
    if(req.user.role!=="admin"){
        const user = await User.findByIdAndUpdate(req.user._id,{role:'owner'})
    }
    const hotel = await Hotel.create(data)

    res.status(201).json({
        status:'success',
        message:'Hotel Reistered successfully🎉',
        hotel
    })
})
const GetHotels = checkasync(async(req,res,next)=>{
    const apifeatures = new apiFeatures(Hotel,req.query).filter().sort();
    const hotels = await apifeatures.query ;
    res.status(200).json({
        status:'success',
        results:hotels.length,
        hotels
    })
})
const getSingelHotel = checkasync(async(req,res,next)=>{
    const hotel = await Hotel.findById(req.params.id).populate('review');
    if(!hotel){
        return next(new AppError('no hotel available',404));
       
    }
    res.status(200).json({
        status:'success',
        hotel
    })
})
const verifyHotel = checkasync(async(req,res,next)=>{
    const id = req.params.id
    const hotel = await Hotel.findByIdAndUpdate(id,{verified:true},{new:true})

    res.status(200).json({
        status:'success',
        message:'hotel verified'
    })
})
const uploadCover = checkasync(async(req,res,next)=>{
    const id = req.params.id
    const hotel = await Hotel.findById(id)
    const path = req.file.path
    if(!hotel){
        return next(new AppError('no Hotel available with this id',404))
    }
    if(hotel.coverPhotoId){
        let deletef = await clouddelete(hotel.coverPhotoId)
    }
    let response = await cloudupload(req.file.path)
    if(!response){
        return next(new AppError('fail to upload Cover Photo',500))
    }
    hotel.coverphoto = response.url
    hotel.coverPhotoId = response.public_id
    await hotel.save({validateBeforeSave:false})
    fs.unlinkSync(req.file.path)
    res.status(200).json({
        status:'success',
        message:'photo uploaded successfully',
        hotel
    })
})
const uploadPhoto = checkasync(async(req,res,next)=>{
    const image =req.file.path;
    const response = await cloudupload(image)

    res.status(200).json({
        status:'success',
        id:response.public_id,
        url:response.url
    })
})

const uploadPhotos = checkasync(async(req,res,next)=>{
    const id = req.params.id
    const imgfile = req.files
    if(!imgfile){
        return next(new AppError('please select photos First',400))
    }
    const hotel = await Hotel.findById(id)
    if(!hotel){
        return next(new AppError('no hotel found!',404))
    }
    let photos=[]
    for(let file of imgfile){
        let response = await cloudupload(file.path)
        fs.unlinkSync(file.path)
        photos.push({
            id:response.public_id,
            photo:response.url
        })
    }
    hotel.photos.push(...photos)
    await hotel.save({validateBeforeSave:false})
    res.status(200).json({
        status:'success',
        message:'all the photos uploaded successFully',
        hotel
    })
})
const deletePhoto = checkasync(async(req,res,next)=>{
    const id =req.params.id
    
    const imageId = req.body.id
    let deleteF = await clouddelete(imageId)
    const hotel = await Hotel.findByIdAndUpdate(id,{$pull:{photos:req.body}},{new:true})
    res.status(200).json({
        status:'success',
        message:'photo deleted successFully',
        hotel
    })
})

const filterObj = (obj,...fields)=>{
    let allowField={}
    for(let ele in obj){
        if(fields.includes(ele)){
            allowField[ele] = obj[ele]
        }
    }
    return allowField
}
const Updatehotel = checkasync(async(req,res,next)=>{
    const id = req.params.id
    let updateobj = filterObj(req.body,"name","price","discount","discription","location","capacity","discription","category")
    let hotel = await Hotel.findByIdAndUpdate(id,updateobj,{new:true})

    res.status(200).json({
        status:'success',
        hotel
    })
})

const deleteHotel = checkasync(async(req,res,next)=>{
    const id = req.params.id
    const hotel = await Hotel.findById(id)
    const user = await User.findByIdAndUpdate(req.user._id,{$pull:{likes:id}});
    
    if(!hotel){
        return next(new AppError('no hotel available',404))
    }
    let deleteF = await clouddelete(hotel.coverPhotoId)
    for(let ele of hotel.photos){
        let f = await clouddelete(ele.id)
    }
    await hotel.deleteOne()
    res.status(200).json({
        status:'success',
        message:'hotel successFully deleted'
    })
})

const addLIke = checkasync(async(req,res,next)=>{
    const user = await User.findById(req.user._id);
    if(user.likes.includes(req.params.id)){
        return next(new AppError('you already liked this hotel',400))
    }
    const hotel = await Hotel.findByIdAndUpdate(req.params.id,{$inc:{likecount:1}},{new:true});
    user.likes.push(hotel._id);
    await user.save({validateBeforeSave:false});
    res.status(200).json({
        status:'success',
        message:'liked'
    })
})
const dislike = checkasync(async(req,res,next)=>{
    const user = await User.findById(req.user._id);
    if(user.likes.includes(req.params.id)){
        const hotel = await Hotel.findByIdAndUpdate(req.params.id,{$inc:{likecount:-1}},{new:true});
        user.likes.pull(req.params.id);
        await user.save({validateBeforeSave:false});
        res.status(200).json({
            status:'success',
            message:'disliked'
        })
    }else{
        return next(new AppError('already dislikes',400))
    }
})

//get liked hotels

const likedHotel = checkasync(async(req,res,next)=>{
    const user  = await  User.findById(req.user._id).populate('likes');
    if(!user){
        return next(new AppError('no user found with'));
    }
    res.status(200).json({
        status:'success',
        result:user.likes.length,
        likes:user.likes
    })
})
module.exports ={RegisterHotel,GetHotels,getSingelHotel,verifyHotel,uploadCover,uploadPhotos,deletePhoto,Updatehotel,deleteHotel,uploadPhoto,addLIke,dislike,likedHotel}
