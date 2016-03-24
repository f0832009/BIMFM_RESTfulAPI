var mongoose = require('mongoose');
var express = require('express');
var Facilities = require('../models/facilities');

module.exports = function(){
    var router = express.Router();
    
    router.post('/', function(req, res){
        var body = '';        
        if(req.body){
            
        }        
        res.end('vv');
    })
    
    router.get('/', function(req, res){               
        res.end('get');        
    })
    
    router.get('/:id', function(req, res){
        
    })
    
    return router;
}