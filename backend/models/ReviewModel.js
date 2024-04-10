const mongoose = require('mongoose')
const Hotel = require('./HotelModel')
const  reviewSchema = new mongoose.Schema({
    description:{
        type:String,
        required:[true,'review must have description']
    },
    rating:{
        type:Number,
        min:0,
        max:5,
        required:[true,'review must have reating']
    },
    author:{
        type:mongoose.Schema.ObjectId,
        ref:'users'
    },
    hotelid:{
        type:mongoose.Schema.ObjectId,
        ref:'Hotel'
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
},{
    toJSON:{virtuals:true},
    toObject:{virtuals:true}
})
// reviewSchema.index({hotelid:1,author:1},{unique:true})
reviewSchema.pre(/^find/,function(next){
    this.populate({
        path:'author',
        select:'name photo'
    })
    next();
})
reviewSchema.statics.calculateAve =  async function(hotelId){
    const stats = await this.aggregate([
        {
            $match:{hotelid:hotelId}
        },
        {
            $group:{
                _id:`$hotelid`,
                nRating:{$sum:1},
                aveRating:{$avg:'$rating'},
            }
        }
    ])
    const hotel = await Hotel.findById(hotelId);
    if(stats.length>0){
        hotel.ReviewQuantity = stats[0].nRating
        hotel.ReviewAverage = parseFloat((stats[0].aveRating).toFixed(2))
        await hotel.save({validateBeforeSave:false});
    }
}
reviewSchema.post('save',function(){
    console.log(this.constructor)
    this.constructor.calculateAve(this.hotelid);
})
reviewSchema.pre(/^findOneAnd/,async function(next){
    this.r = await this.clone().findOne();
    next();
})
reviewSchema.post(/^findOneAnd/, async function(){
    await this.r.constructor.calculateAve(this.r.hotelid)
})
const Review = mongoose.model('review',reviewSchema);

module.exports = Review