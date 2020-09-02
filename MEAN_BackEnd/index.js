var http = require('http');
var express=require('express');
var port = process.env.port || 8083;
var app= express();
var CustAppRoutes=require('./routes/CustomerAppRoutes');
var ItemAppRoutes=require('./routes/ItemAppRoutes');
var OrderAppRoutes=require('./routes/OrderAppRoutes');
var OrderItemAppRoutes=require('./routes/OrderItemAppRoutes');
var mongoose =require('mongoose');
var bodyParser=require('body-parser');
var cors=require('cors');


mongoose.connect('mongodb://localhost/RestaurantDB',{useUnifiedTopology:true,useNewUrlParser:true});
app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use('/api/Customer',CustAppRoutes);
app.use('/api/Item',ItemAppRoutes);
app.use('/api/Order',OrderAppRoutes);
app.use('/api/OrderItem',OrderItemAppRoutes);
http.createServer(app).listen(port);
console.log("Backend Running on Port :",port );