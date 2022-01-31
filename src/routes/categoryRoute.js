var express = require('express')
var categoryRouter = express.Router();

var mongodb = require('mongodb').MongoClient;
var url = "mongodb://127.0.0.1:27017";

function router(menu){
categoryRouter.route('/').get( function(req, res){
    mongodb.connect(url, function(err, dc){
        if(err){
            res.status(501).send("Error while connecting")
        }else{
            const dbo = dc.db('first');
            dbo.collection('category').find().toArray(function(err,data){
                if(err){
                    res.status(501).send("Error while Fetching")
                }else{
                    res.render('category',{title:'Category Page', categories: data, menu})
                }
                })
        }
    })
    // res.send(categories);
})
return categoryRouter
}

module.exports = router