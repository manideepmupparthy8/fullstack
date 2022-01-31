var express = require('express')
var restaurantRouter = express.Router();

var mongodb = require('mongodb').MongoClient;
// var url = process.env.LiveMongo;
var url = "mongodb+srv://ManideepMupparthy:Manibabu1438@cluster0.mrruj.mongodb.net/restaurants?retryWrites=true&w=majority" 

function router(menu){
  restaurantRouter.route('/').get(function (req, res){
    mongodb.connect(url, function (err, dc){
      if(err){
        res.status(501).send('Error while Connecting')
      }else{
        const dbo = dc.db('restaurants');
        dbo.collection('restaurant').find().toArray(function (err,data){
          if(err){
            res.status(501).send('Error while Fetching')
          }else{
            res.render('restaurant',{title: "Restaurants Page", restaurants: data,menu})
          }
        })
      }
    })
      // res.send(restaurants)
  })

  restaurantRouter.route('/Details').get(function (req, res){
    res.send("Restaurants Details Page")
})

return restaurantRouter
}

module.exports = router