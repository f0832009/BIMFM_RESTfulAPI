var mongoose = require('mongoose');
var Facility = require('../models/facilities');
var async = require('async');

module.exports = function(app){    
    Facility.methods(['get', 'post', 'put', 'delete']);
    
    Facility.before('get', function(req, res, next){
        req.query.limit = parseInt(req.query.limit);
        next();
    })
    
    Facility.route('upload.post', function(req, res, next) {
        async.each(req.body, function(item, callback){
            var facility = new Facility(item);
            facility.save().then(function(doc){                
                callback(null);
            })               
        }, function(err){
            if(err) console.error(err);
            res.end('upload success');
        })
    }); 
    Facility.register(app, '/facilities');    
}

