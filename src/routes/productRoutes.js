var express = require('express');
var productRouter = express.Router();

var mongodb = require('mongodb').MongoClient;
var url = "mongodb://127.0.0.1:27017"


  function router(menu){
  productRouter.route('/').get(function (req, res){
    mongodb.connect(url, function (err, dc){
      if(err){
        res.status(501).send('Error while Connecting')
      }else{
        const dbo = dc.db('first');
        dbo.collection('products').find().toArray(function(err,data){
          if(err){
            res.status(501).send('Error while Fetching')
          }else{
            res.render("products",{title:'Products Page', products: data,menu})
          }
        })
      }
    })
      // res.send(products)
  })


  productRouter.route('/category/:id').get(function (req, res){
    // var id = req.params.id
    var {_id} = req.params
    // var name = req.query.name
    mongodb.connect(url, function (err, dc){
      if(err){
        res.status(501).send('Error while Connecting')
      }else{
        const dbo = dc.db('first');
        dbo.collection('products').find({_id : _id}).toArray(function(err,data){
          if(err){
            res.status(501).send('Error while Fetching')
          }else{
            res.render("productCategory",{title:'Products Page', products: data,menu})
          }
        })
      }
    })
})

  productRouter.route('/details/:id').get(function (req, res){
      res.send('Product Details Page')
  })
  return productRouter
}

  module.exports = router