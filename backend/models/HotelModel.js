const mongoose = require('mongoose')

const hotelSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'please enter hotel name']
    },
    discription:{
        type:String,
        required:[true,'please enter discription']
    },
    capacity:{
        type:Number,
        required:[true,'please enter capacity']
    },
    ReviewQuantity:{
        type:Number,
        default:0
    },
    ReviewAverage:{
        type:Number,
        default:0
    },
    createAt:{
        type:Date,
        default:Date.now()
    },
    owner:{
        type:mongoose.Schema.ObjectId,
        ref:'users'
    },
    coverphoto:{
        type:String,
        default:"https://imgs.search.brave.com/09UTKImxtLgX42Q_q8MNr2VaDd12FzfPCdU_HS33X-g/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzdlLzZh/L2Q0LzdlNmFkNGY1/NjY1ODkwNmRhZGM4/M2UwZjJkMjUxYzEw/LmpwZw"
    },
    photos:[{
        id:String,
        photo:String
    }],
    price:{
        type:Number,
        required:[true,'hotel should have price']
    },
    discount:{
        type:Number,
        default:0
    },
    category:{
        type:String,
        enum:['Villa Rooms',
        'Suites',
        'Restaurant',
        'Meeting Rooms',
        'Spa']
    },
    location:{
        type:{
            type:String,
            default:'Point',
            enum:['Point']
        },
        coordinates:{
            type:[Number],
            default:[0,0]
        },
        address:String,
        City:String
    },
    verified:{
        type:Boolean,
        default:false
    },
    likecount:{
        type:Number,
        default:0
    },
    coverPhotoId:String
},{
    toJSON:{virtuals:true},
    toObject:{virtuals:true}
})

hotelSchema.pre(/^find/,function(next){
    this.populate({
        path:'owner',
        select:'name email photo'
    })
    next();
})
hotelSchema.virtual('review',{
    ref:'review',
    foreignField:'hotelid',
    localField:'_id'
})
const Hotel = mongoose.model('Hotel',hotelSchema)

module.exports = Hotel