const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var { Order } = require('../models/Order');

// => localhost:8083/Order/
router.get('/', (req, res) => {
    Order.find((err, docs) => {
        if (!err) { res.send(docs); }
        else { console.log('Error in Retriving Order :' + JSON.stringify(err, undefined, 2)); }
    });
});

// router.get('/:id', (req, res) => {
//     if (!ObjectId.isValid(req.params.id))
//         return res.status(400).send(`No record with given id : ${req.params.id}`);

//         Order.findById(req.params.id, (err, doc) => {
//         if (!err) { res.send(doc); }
//         else { console.log('Error in Retriving Order :' + JSON.stringify(err, undefined, 2)); }
//     });
// });

router.get('/:OrderID', (req, res) => {
    // if (!ObjectId.isValid(req.params.OrderID))
    //     return res.status(400).send(`No record with given id : ${req.params.OrderID}`);

        Order.find({OrderID:req.params.OrderID}, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Retriving Order :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.post('/', (req, res) => {
    var odr = new Order({
        OrderID : req.body.OrderID ,
        OrderNo : req.body.OrderNo ,
        CustomerID : req.body.CustomerID,
        PMethod : req.body.PMethod,
        GTotal:req.body.GTotal
         });
    odr.save((err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Order Save :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.put('/:id', (req, res) => {
    // if (!ObjectId.isValid(req.params.id))
    //     return res.status(400).send(`No record with given id : ${req.params.id}`);

    var odr = {
        OrderID : req.body.OrderID ,
        OrderNo : req.body.OrderNo ,
        CustomerID : req.body.CustomerID,
        PMethod : req.body.PMethod,
        GTotal:req.body.GTotal
    };
    var myquery = { OrderID: req.params.id };
    Order.updateOne(myquery, { $set: odr }, { new: true }, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Order Update :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.delete('/:OrderID', (req, res) => {
    // if (!ObjectId.isValid(req.params.id))
    //     return res.status(400).send(`No record with given id : ${req.params.id}`);
        var myquery = { OrderID: req.params.OrderID };
        Order.deleteOne(myquery, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Order Delete :' + JSON.stringify(err, undefined, 2)); }
    });
});

module.exports = router;