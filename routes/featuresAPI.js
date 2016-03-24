var mongoose = require('mongoose');
var express = require('express');
var Feature = require('../models/features');

module.exports = function(){
    var router = express.Router();
    
    router.post('/', function(req, res){
         var data = req.body;
         if(data.length > 1){
             data.forEach(function(item){
                 var feature = new Feature(item);
                //  feature.save().then(function(doc){
                     
                //  })
                feature.save(function(err, doc){
                    
                })
             })
         }
         res.end('end');
    })
    
    router.get('/', function(req, res){
        Feature.find(function(err, data, count){
            if(err) return console.error(err);

            res.end(JSON.stringify(data));    
        });      
    })
    
    router.put('/:featureName', function(req, res){        
        // Feature.findOne({ name: req.params.featureName}).exec(function(err, doc){
        //     if(err) return console.error(err);
        //     res.end(JSON.stringify(doc));
        // })
        var json = req.body;
        Feature.update(
            { name: req.params.featureName }, 
            { $push: { properties: json } },
            function(err, count){
                
            })        
    })
    
    router.delete('/', function(req, res){
        Feature.remove({}, function(err){
            if(err) return console.error(err);
            res.end('delete');
        })
    })
    
    return router;
}