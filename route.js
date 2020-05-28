const express = require('express');
const app = express();
const mongoose = require("mongoose");
const {mongoUrl} = require('./config/mongoUrl');

const Product = require('./models/schema');

var fs = require("fs");



mongoose.connect(mongoUrl,{useNewUrlParser:true, useUnifiedTopology: true});

module.exports = (app) => {
    //Bài 1:
    app.get('/bai1', (req, res) => {
        var sendData = new Array();
        fs.readFile('text.txt', function(err, data){
            var drawString = data.toString();
            var Products = drawString.split('\n');
            for(i=0; i<Products.length; i++){
                var word = Products[i].split('|');
                for(j=0; j<word.length; j+=7){
                    console.log(word[j]);
                    sendData.push({ ID: word[j],
                                    name: word[j+1],
                                    price: word[j+2],
                                    trademark: word[j+3],
                                    qty: word[j+4],
                                    decribe: word[j+5],
                                    img: word[j+6]
                                    })
                }
            }
            res.send(sendData);
        });
    });
    //Bài 2:
    app.post('/bai2', (req, res) => {
        var writeData = new Array();
        var result = "";
        writeData.push(req.body.fullname);
        writeData.push(req.body.email);
        writeData.push(req.body.numberphone);
        writeData.push(req.body.describe);
        writeData.push(req.body.time);
        for(i=0; i<writeData.length; i++){
            // console.log(result);
            if(i == (writeData.length-1)){
                result += writeData[i] + '\r\n';
            }else{
                result += writeData[i] + '|';
            }
        }
        // console.log(writeData);
        fs.appendFile('bai2.txt', result, function (err) {
            if (err) return res.send(err); 
            res.send('write done!!');
          });
        
    });
    //Bài 3: ///////////////////////////////////////////////////////////////////
    app.post('/bai3', (req, res) => {
        const product = new Product({
            Title: req.body.title,
            Summary: req.body.summary,
            ImageUrl: req.body.imageUrl,
            price: req.body.price,
            Number: req.body.number
        });

        product
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: "Handling POST requests to create Product!",
                createProduct: result
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
        
    });
    app.get('/bai3', (req, res) => {
        Product
        .find()
        .exec()
        .then(docs => {
            console.log(docs);
            res.status(200).json(docs);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });
        
    });

    app.patch("/bai3/:productId", (req, res) => {
        const id = req.params.productId;
        
        console.log(req.body.title);
        Product.updateOne({_id: id}, {$set: {
            Title: req.body.title,
            Summary: req.body.summary,
            ImageUrl: req.body.imageUrl,
            Price: req.body.price,
            Number: req.body.number
        }})
            .exec()
            .then(result => {
                console.log(res);
                res.status(200).json(result);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    error : err
                })
            });
        
    });

    app.delete("/bai3/:productId", (req, res) => {
        const id = req.params.productId;
        Product.remove({_id: id})
        .exec()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
    });
}