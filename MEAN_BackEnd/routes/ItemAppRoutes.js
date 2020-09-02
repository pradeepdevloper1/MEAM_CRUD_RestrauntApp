const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var { Item } = require('../models/Item');

// => localhost:8083/Item/
router.get('/', (req, res) => {
    Item.find((err, docs) => {
        if (!err) { res.send(docs); }
        else { console.log('Error in Retriving Item :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.get('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

        Item.findById(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Retriving Item :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.post('/', (req, res) => {
    var itm = new Item({
        ItemID : req.body.ItemID ,
        Name : req.body.Name ,
        Price : req.body.Price
         });
    itm.save((err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Item Save :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.put('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    var itm = {
        ItemID : req.body.ItemID ,
        Name : req.body.Name ,
        Price : req.body.Price
    };
    Item.findByIdAndUpdate(req.params.id, { $set: itm }, { new: true }, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Item Update :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.delete('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

        Item.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Item Delete :' + JSON.stringify(err, undefined, 2)); }
    });
});

module.exports = router;