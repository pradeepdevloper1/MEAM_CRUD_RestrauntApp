var mongoose =require('mongoose');
var Customer=mongoose.model('Customers',{
    CustomerID :{type:String},
    Name :{type:String},
});
module.exports={Customer};