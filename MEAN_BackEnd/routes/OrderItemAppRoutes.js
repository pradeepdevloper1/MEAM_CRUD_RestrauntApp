const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var { OrderItem } = require('../models/OrderItem');

// => localhost:8083/OrderItem/
router.get('/', (req, res) => {
    OrderItem.find((err, docs) => {
        if (!err) { res.send(docs); }
        else { console.log('Error in Retriving OrderItem :' + JSON.stringify(err, undefined, 2)); }
    });
});


router.get('/:OrderID', (req, res) => {
    OrderItem.find({OrderID:req.params.OrderID}, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Retriving OrderItem :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.post('/', (req, res) => {
    var odr_itm = new OrderItem({
        OrderItemID : req.body.OrderItemID ,
        OrderID : req.body.OrderID ,
        ItemID : req.body.ItemID ,
        Quantity:req.body.Quantity,
        ItemName : req.body.ItemName,
        Price : req.body.Price,
        Total:req.body.Total
         });
        odr_itm.save((err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in OrderItem Save :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.put('/:OrderItemID', (req, res) => {
    // if (!ObjectId.isValid(req.params.id))
    //     return res.status(400).send(`No record with given id : ${req.params.id}`);

    var odr_itm = {
        OrderItemID : req.body.OrderItemID ,
        OrderID : req.body.OrderID ,
        ItemID : req.body.ItemID ,
        Quantity:req.body.Quantity,
        ItemName : req.body.ItemName,
        Price : req.body.Price,
        Total:req.body.Total
    };
    var myquery = { OrderItemID: req.params.OrderItemID };
    OrderItem.updateOne(myquery, { $set: odr_itm }, { new: true }, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in OrderItem Update :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.delete('/:OrderItemID', (req, res) => {
        var myquery = { OrderItemID: req.params.OrderItemID };
        OrderItem.deleteOne(myquery, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in OrderItem Delete :' + JSON.stringify(err, undefined, 2)); }
    });
});

module.exports = router;