const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var { PaymentDetail } = require('../models/PaymentDetail');

// => localhost:8083/PaymentDetail/
router.get('/', (req, res) => {
    PaymentDetail.find((err, docs) => {
        if (!err) { res.send(docs); }
        else { console.log('Error in Retriving PaymentDetail :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.get('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

        PaymentDetail.findById(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Retriving PaymentDetail :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.post('/', (req, res) => {
    var pd = new PaymentDetail({
        CardOwnerName : req.body.CardOwnerName ,
        CardNumber : req.body.CardNumber ,
        ExpirationDate : req.body.ExpirationDate ,
        CVV : req.body.CVV 
           });
    pd.save((err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in PaymentDetail Save :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.put('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    var pd = {
        CardOwnerName : req.body.CardOwnerName ,
        CardNumber : req.body.CardNumber ,
        ExpirationDate : req.body.ExpirationDate ,
        CVV : req.body.CVV 
    };
    PaymentDetail.findByIdAndUpdate(req.params.id, { $set: pd }, { new: true }, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in PaymentDetail Update :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.delete('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

        PaymentDetail.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in PaymentDetail Delete :' + JSON.stringify(err, undefined, 2)); }
    });
});

module.exports = router;