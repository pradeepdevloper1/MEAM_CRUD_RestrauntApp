var mongoose =require('mongoose');
var Item=mongoose.model('Items',{
    ItemID :{type:Number},
    Name :{type:String},
    Price:{type:Number}
});
module.exports={Item};