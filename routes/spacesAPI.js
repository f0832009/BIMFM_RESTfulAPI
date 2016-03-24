var mongoose = require('mongoose');
var express = require('express');
var Space = require('../models/spaces');
var validator = require('express-validator');
var util = require('util');
var async = require('async');

module.exports = function(){
    var router = express.Router();
    
    router.post('/', function(req, res){
        var treeData = req.body;
        //lack validator
        var root = new Space({
            'name': treeData.name,
            'resourcePath': treeData.resourcePath,
            'remark': treeData.remark,
            'childType': treeData.childType
        }).save(function(err, savedNode){
            var parse = function recursive(treeObjcet, parentNode){
                if(treeObjcet.children){
                    var children = treeObjcet.children;
                    //lack async
                    children.forEach(function(childObject){                      
                        var t = parentNode.appendChild(childObject).then(function(data){
                            recursive(childObject, data);
                        })                        
                    })
                }
            }
            parse(treeData, savedNode);
        })
    })
    
    router.get('/', function(req, res, next){
        if(Object.keys(req.query).length != 0){
            Space.findOne({ parentId: null }, function(err, doc){
                if(err) return console.error(err);                
                res.locals.doc = doc;                    
                next();               
            })            
        }
        else{
            Space.find(function (err, data){
                res.end(JSON.stringify(data));    
            })
        }
    })
    
    //query rule: childType
    router.get('/', function(req, res){
        req.assert('childType', 'error query').notEmpty();
        var errors = req.validationErrors();
        if (errors) {
            res.send('There have been validation errors: ' + util.inspect(errors), 400);
            return;
        }        
        
        var childType = req.query.childType;
        var result = '';
        // res.locals.doc.getChildren({
        Space.find({
            // condition: { childType: childType },
            // fields: { childType: 0 },         
            childType: childType               
        },function(err,docs){
            if(err) return console.error(err);  
            async.map(docs, function(doc, callback){
                //depth 1
                var regPath = new RegExp(',' + doc._id + '$');                
                Space.find({ path: regPath }).exec(function(err, docs){
                    if(err) return console.error(err);      
                    // res.write(JSON.stringify(docs));
                    // res.write('');
                    callback(null, docs);                    
                })
            }, function(err, result){
                if(err) return console.error(err);
                res.end(JSON.stringify(result));
            });         
        })         
    })
    
    router.get('/node/:nodeId', function(req, res){
        
        var id = mongoose.Types.ObjectId(req.params.nodeId);
        Space.findOne({ _id: id }).exec().then(function(doc){
            res.end(JSON.stringify(doc));
        })
    })
    
    router.get('/treeJsonData', function(req, res){
        // Space.findOne({parentId: null}).exec(function(err, doc){
        //     if(err) return console.error(err);
        //     doc.getTree().then(function(err, tree){
        //         res.end(JSON.stringify(tree));
        //     })
        // })
        Space.GetFullTree().then(function(tree){
            res.end(JSON.stringify(tree));
        })        
    })
    
    //query spacename
    router.get('/spaceName/:spaceName', function(req, res){
        Space.findOne({ parentId: null }).exec(function(err, doc){
            if(err) return console.error(err);
            doc.getChildren({
                condition: { name: req.params.spaceName },
                fields:{name: 1, resourcePath: 1},
                sort: {name: 1}
            },function(err, docs){                 
                if(err) return console.error(err);                
                res.end(JSON.stringify(docs));
            })
        })        
    })
    
    router.get('/test', function(req, res){     
        req.assert('limit', 'error query').notEmpty().isInt();
        req.assert('skip', 'error query').notEmpty().isInt();
        var errors = req.validationErrors();
        if (errors) {
            res.send('There have been validation errors: ' + util.inspect(errors), 400);
            return;
        }        
                
        Space.findOne({ parentId: null }).exec(function(err, doc){
            if(err) return console.error(err);
            // console.log(doc.getChildCondition());
            doc.getDescendants({ limit: parseInt(req.query.limit), skip: parseInt(req.query.skip) },function(err, docs){                 
                if(err) return console.error(err);                
                res.end(JSON.stringify(docs));
            })
        })        
    })
    
    //query materilzedPath
    router.get('/path/:path', function(req, res){     
        // req.assert('limit', 'error query').notEmpty().isInt();
        // req.assert('skip', 'error query').notEmpty().isInt();
        // var errors = req.validationErrors();
        // if (errors) {
        //     res.send('There have been validation errors: ' + util.inspect(errors), 400);
        //     return;
        // }        
        var regPath = new RegExp(',' + req.params.path);
                
        Space.find({ path: regPath }).exec(function(err, docs){
            if(err) return console.error(err);      
            res.end(JSON.stringify(docs));            
        })        
    })   
    
    //get all childtype
    router.get('/childType', function(req, res, next){        
        Space.find({childType: { $exists: true }}).distinct('childType').exec(function(err, docs){
            if(err) return console.error(err);   
               
            res.end(JSON.stringify(docs));
        })        
    })       
    
    router.put('/', function(req, res){
        // not implement
        res.end('not implement');
    })   
    
    
    router.delete('/', function(req, res){
        Space.remove({}, function(err){
            if(err) return console.error(err);
            res.end('delete');
        })
    })
    
    return router;
}