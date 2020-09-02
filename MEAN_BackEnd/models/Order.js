var mongoose =require('mongoose');
var Order=mongoose.model('Orders',{
    OrderID :{type:Number},
    OrderNo :{type:String},
    CustomerID:{type:String},
    PMethod:{type:String},
    GTotal:{type:Number}
});
module.exports={Order};