const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var { Customer } = require('../models/Customer');

// => localhost:8083/Customer/
router.get('/', (req, res) => {
    Customer.find((err, docs) => {
        if (!err) { res.send(docs); }
        else { console.log('Error in Retriving Customer :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.get('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

        Customer.findById(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Retriving Customer :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.post('/', (req, res) => {
    var cust = new Customer({
        CustomerID : req.body.CustomerID ,
        Name : req.body.Name ,
         });
    cust.save((err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Customer Save :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.put('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    var cust = {
        CustomerID : req.body.CustomerID ,
        Name : req.body.Name ,
    };
    Customer.findByIdAndUpdate(req.params.id, { $set: cust }, { new: true }, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Customer Update :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.delete('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

        Customer.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Customer Delete :' + JSON.stringify(err, undefined, 2)); }
    });
});

module.exports = router;