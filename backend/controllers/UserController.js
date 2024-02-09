const User = require('../models/usermodel')
const AppError = require('../utils/Error')
const jwt = require('jsonwebtoken')
const {promisify} = require('util')
const Email = require('../utils/Email')
const crypto = require('crypto')
const {clouddelete,cloudupload} = require('../utils/Upload')
const fs = require('fs')
const checkasync = fn =>{
    return (req,res,next)=>{
        fn(req,res,next).catch(next)
    }
}
const filterObj = (obj,...allowedField)=>{
    let newobj ={}
    Object.keys(obj).forEach(el=>{
        if(allowedField.includes(el)) newobj[el] = obj[el]
    })
    return newobj
}
const createtoken = (id)=>{
    return jwt.sign({id:id},process.env.Token_secret,{
        expiresIn:process.env.Token_expires
    })
}
const createSendCookie = (user,res,statusCode)=>{
    let token = createtoken(user._id)
    const cookieOption = {
        expires:new Date(Date.now()+30*24*60*60*1000),
        httpOnly:true
    }
    res.cookie("jwt",token,cookieOption)
    res.status(statusCode).json({
        status:'success',
        user
    })
}
//create user
const createUser = checkasync(async(req,res,next)=>{
    const user = await User.create(req.body)
    if(!user){
        return next(new AppError('fail to create user',500))
    }
    let token =createtoken(user._id)
    createSendCookie(user,res,201)
})
//login passowrd
const LoginUser = checkasync(async(req,res,next)=>{
    const {email,password} = req.body
    if(!email || !password){
        return next(new AppError('please provide email or password',400))
    }
    const olduser = await User.findOne({email:email}).select('+password')
    if(!olduser){
        return next(new AppError('no user found with this email'))
    }
    if(!(await olduser.comparepassword(password,olduser.password))){
        return next(new AppError('please enter correct password',401))
    }
    createSendCookie(olduser,res,200)
})
//check email
const protected=checkasync(async(req,res,next)=>{
    //find token
    if(!req.cookies.jwt){
        return next(new AppError('no token available please login again',400))
    }
    //decode token
    const decoded = await promisify(jwt.verify)(req.cookies.jwt,process.env.Token_secret)
    if(!decoded){
        return next(new AppError('invalid token!',401))
    }
    const user = await User.findById(decoded.id)
    if(!user){
        let changeAt = parseInt(this.passwordChangeAt.getTime()/1000,10)
        return next(new AppError('no user found',404))
    }
    const isChange =user.ispasswordChange(decoded.iap)
    if(isChange){
        return next(new AppError('password changed! please login again',401))
    }
    req.user = user
    next()
})
const verifyUser = checkasync(async(req,res,next)=>{
   if(!req.user){
        return next(new AppError('no user found! please login again',404))
   }
   res.status(200).json({
    status:'success',
    user:req.user
   })
})
//updatepassword
const updatepassword = checkasync(async(req,res,next)=>{
    //find user
    const {oldpassword,newpassword,conformnewpassword} = req.body
    const user = await User.findById(req.user._id).select('+password')
    if(!user){
        return next(new AppError('no user found!',404))
    }
    let correct = await user.comparepassword(oldpassword,user.password)
    if(!correct){
        return next(new AppError('password incorrect',401))
    }
    user.password = newpassword
    user.conformpassword = conformnewpassword
    user.passwordChangeAt = new Date(Date.now())
    await user.save()
    createSendCookie(user,res,200)
})
//forgotpassword
const forgotpassword=checkasync(async(req,res,next)=>{
    const email = req.body.email
    //find user by email
    const user = await User.findOne({email:email})
    if(!user){
        return next(new AppError('user not found',404))
    }
    let resettoken = user.changepasswordtoken()
    await user.save({validateBeforeSave:false})
    let url = `${req.protocol}:/localhost:3000/resetpassword/${resettoken}`
    await new Email(user,url).sendPasswordReset()
    res.status(200).json({
        status:'success',
        message:'email sent successfully'
    })
})
const resetpassword = checkasync(async(req,res,next)=>{
    const {resettoken} = req.params
    const {newpassword,conformnewpassword}= req.body
    //create token 
    let token = crypto.createHash('sha256').update(resettoken).digest('hex')
    const user = await User.findOne({passwordChangetoken:token,passwordChangetokenexpires:{$gt:Date.now()}})
    if(!user){
        return next(new AppError('token expires! please try again',401))
    }
    user.password=newpassword
    user.conformpassword= conformnewpassword
    user.passwordChangeAt=Date.now()
    user.passwordChangetoken=undefined,
    user.passwordChangetokenexpires=undefined
    await user.save()
    createSendCookie(user,res,200)
})

const restriTO = (...roles)=>{
    return (req,res,next)=>{
        if(!roles.includes(req.user.role)){
            return next(new AppError('you have no permission to do this',500))
        }
        next()
    }
}
const uploadProfile = checkasync(async(req,res,next)=>{
    const user = await User.findById(req.user._id)
    if(!user){
        return next('no user found!',404)
    }
    if(user.photoid){
        let deletephoto = await clouddelete(user.photoid)
    }
    let response = await cloudupload(req.file.path)
    user.photo = response.url
    user.photoid=response.public_id
    await user.save({validateBeforeSave:false})
    fs.unlinkSync(req.file.path)
    res.status(200).json({
        status:'success',
        message:'photo upload successfully'
    })
})
const deleteuser = checkasync(async(req,res,next)=>{
    const user = await User.findById(req.user._id)
    if(!user){
        return next(new AppError('no user found!',404))
    }
    user.active = false
    await user.save({validateBeforeSave:false})
    req.user = null
    res.cookie('jwt',"delete",{
        expires:new Date(Date.now()+10*1000),
        httpOnly:true
    })
    res.status(200).json({
        status:"success",
        message:'user deleted successfully'
    })
})
const logout = checkasync((req,res,next)=>{
    res.cookie("jwt","loggedout",{
        expires:new Date(Date.now()+10*1000),
        httpOnly:true
    })
    req.user = null
    res.status(200).json({
        status:'success',
        message:'logged out successfully'
    })
})

const updateMe = checkasync(async(req,res,next)=>{
    const obj = filterObj(req.body,'name','username','email')
    const user = await User.findByIdAndUpdate(req.user._id,obj,{new:true})
    createSendCookie(user,res,200)
})
module.exports = {createUser,LoginUser,protected,verifyUser,updatepassword,forgotpassword,resetpassword,uploadProfile,deleteuser,logout,updateMe}