const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')
const crypto = require('crypto')
const userSchema = new mongoose.Schema({
    name:{
        type:String,
       
    },
    username:{
        type:String,
        unique:true,
        
    },
    email:{
        type:String,
       
        trim:true,
        lowercase:true,
        validate:[validator.isEmail,'please enter valid email'],
        unique:true    
    },
    password:{
        type:String,
        minlength:8,
        maxlength:16,
        
        select:false
    },
    conformpassword:{
        type:String,
       
        validate:{
            validator: function(el){
                return el===this.password
            },
            message:'passoword is not same'
        }
    },
    createAt:{
        type:Date,
        default:Date.now(),
        select:false
    },
    role:{
        type:String,
        default:'user',
        enum:['user','owner','admin'],
    },
    photo:{
            type:String,
            default:"https://imgs.search.brave.com/t_EO3diQ0lNqEI0BznGqzktsXdr8cd-_ABxoymHugIc/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9jZG4x/Lmljb25maW5kZXIu/Y29tL2RhdGEvaWNv/bnMvdXNlci1waWN0/dXJlcy8xMDAvbWFs/ZTMtNTEyLnBuZw"
    },
    passwordChangeAt:Date,
    passwordChangetoken:String,
    passwordChangetokenexpires:Date,
    photoid:String,
    active:{
        type:Boolean,
        default:true,
        select:false
    },
    likes:[{
        type:mongoose.Schema.ObjectId,
        ref:'Hotel'
    }],
    googleId:String
})
userSchema.pre(/^find/,async function(next){
    this.find({active:{$ne:false}})
    next()
})
userSchema.pre('save',async function(next){
    if(!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password,12);
    this.conformpassword = undefined;
    next()
})
userSchema.methods.comparepassword =async function(candidatepassword,userpassword){
    return await bcrypt.compare(candidatepassword,userpassword)
}
userSchema.methods.ispasswordChange = function(jwttime){
    if(this.passwordChangeAt){
        let changeAt = parseInt(this.passwordChangeAt.getTime()/1000,10)
        return jwttime<changeAt
    }
    return false
}
userSchema.methods.changepasswordtoken = function(){
    let resettoken = crypto.randomBytes(32).toString('hex')
    this.passwordChangetoken = crypto.createHash('sha256').update(resettoken).digest('hex')
    this.passwordChangetokenexpires = Date.now()+25*60*1000
    return resettoken
}
const User = mongoose.model('users',userSchema)
module.exports = User