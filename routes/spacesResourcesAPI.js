var mongoose = require('mongoose');
var express = require('express');
var Space = require('../models/resources_tree');

module.exports = function(){
    var router = express.Router();
    
    router.post('/', function(req, res){
        if(req.body){
            req.body.forEach(function(item){
                var input = new Space(item);
                input.save(function(err){
                    if(err) return console.error(err);
                    console.log('done');
                })
            })
        }
    })
    
    router.get('/', function(req, res){
        Space.find(function (err, data){
            console.log(data[1]);
        })
        console.log(req.query);
    })
    
    return router;
}