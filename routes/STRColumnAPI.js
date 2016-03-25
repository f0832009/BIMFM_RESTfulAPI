var mongoose = require('mongoose');
var STRColumn = require('../models/STRColumns');
var Facility = require('../models/facilities');
var async = require('async');

module.exports = function(app){    
    STRColumn.methods(['get', 'post', 'put', 'delete']);
    
    STRColumn.before('get', function(req, res, next){
        req.query.limit = parseInt(req.query.limit);
        next();
    })
    
    STRColumn.route('upload.post', function(req, res, next) {
        async.each(req.body, function(item, callback){
            Facility.findOne({ name: item.facilityName }).then(function(doc){              
                var column = new STRColumn({
                    name: item.name,
                    uid: parseInt(item.uid),
                    fm_id: item.fm_id,
                    facility_id: doc._id
                });
                column.save(function(err, doc){
                    if(err) return console.error(err);                    
                    callback(null);                    
                })    
            })
        
        }, function(err){
            if(err) console.error(err);
            res.end('upload success');
        })
    }); 
    
    // StrColumn.route('fm_id/')
    
    STRColumn.route('remove.delete', function(req, res, next){
        STRColumn.remove({}, function(err){
            if(err) return console.error(err);
            res.end('delete success');
        })
    })
    
    STRColumn.register(app, '/STRColumns');    
}

