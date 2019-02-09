let CustomerModel = require('../modals/customer.modal');
let express = require('express');
let router = express.Router()

//Post
router.post('/customer', (req,res)=>{
    if(!req.body){
        return res.status(400).send('Request body is missing');
    }    

    if(!req.body.email){
        //...
    }

    // let user = {
    //     name: 'firstname lastname',
    //     email: 'email@gmail.com'
    // }
    let model = CustomerModel(req.body)
    model.save()
        .then(doc => {
            if(!doc || doc.length === 0){
                return res.status(500).send(doc)
            }
            res.status(201).send(doc)
        })  
        .catch(err => {
            res.status(500).json(err)
        })
});     


//Get
router.get('/customer', (req, res)=>{
    if(!req.query.email) {
        return res.status(400).send('Missing URL parameter: email')
    }
    CustomerModel.findOne({
        email: req.query.email
    })
        .then(doc => {
            res.json(doc)
        })
        .catch(err => {
            res.status(500).json(err)
        })
});


//Update
router.put('/customer', (req,res)=>{
    if(!req.query.email) {
        return res.status(400).send('Missing URL parameter: email')
    }

    CustomerModel.findOneAndUpdate({
        email: req.query.email
    }, req.body, {
        new: true
    })
        .then(doc => {
            res.json(doc)
        })
        .catch(err => {
            res.status(500).json(err)
        })
});

//Delete
router.delete('/customer', (req,res)=>{
    if(!req.query.email) {
        return res.status(400).send('Missing URL parameter: email')
    }

    CustomerModel.findOneAndRemove({
        email: req.query.email
    })
        .then(doc => {
            res.json(doc)
        })
        .catch(err => {
            res.status(500).json(err)
        })
});



module.exports = router 