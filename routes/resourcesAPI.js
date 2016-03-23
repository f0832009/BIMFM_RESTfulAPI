var mongoose = require('mongoose');
var express = require('express');
var Resources = require('../models/resources');

module.exports = function(){
    var router = express.Router();
    
    router.post('/', function(req, res){        
        var resources_json = req.body;    
        req.body.forEach(function(item){
            if(item['parent']){
                Resources.findOne({'name':item['parent']}, function(err,result){
                    if(err) return console.error(err);
                    
                    var parentId = result.id;                    
                    item['parentID'] = parentId;
                    item['parent'] = undefined;
                    console.log(item);
                    
                    var input = new Resources(item);
                    input.save(function(err){
                        if(err)
                            return console.error(err);
                        console.log('done!!');
                    })                    
                })
            }
        })

        // res.end(JSON.stringify(req.body[0]));
    })
    
    router.get('/', function(req, res){
        Resources.find(function(err, data, count){
            if(err) return console.error(err);
            console.log(count);
            console.log(data[1]);
               
            res.end(JSON.stringify(data));    
        });        
    });
    
   router.get('/floor/:name1/layers/:name2', function(req, res){
        Resources.findOne({name: req.params.name1,'layers.name': req.params.name2}, function(err, data, count){
            if(err) return console.error(err);
               
            res.end(JSON.stringify(data));    
        });        
    });
    
    router.get('/floor/:name', function(req, res){
        Resources.findOne({name: req.params.name},function(err, data, count){
            if(err) return console.error(err);
 
            res.end(JSON.stringify(data));    
        });
        
    });
    
    router.delete('/',function(req, res){
        Resources.remove({name: null}, function(err){
            if(err) return console.error(err);
            res.end('done'); 
        })
    })

    return router;
}