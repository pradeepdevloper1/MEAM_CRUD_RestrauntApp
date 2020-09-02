
var mongoose =require('mongoose');
var OrderItem=mongoose.model('OrderItems',{
    OrderItemID :{type:Number},
    OrderID :{type:Number},
    ItemID :{type:Number},
    Quantity:{type:Number},
    ItemName:{type:String},
    Price:{type:Number},
    Total:{type:Number}
});
module.exports={OrderItem};

