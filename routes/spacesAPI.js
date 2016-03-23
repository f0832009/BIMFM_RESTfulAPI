var mongoose = require('mongoose');
var express = require('express');
var Space = require('../models/spaces');

module.exports = function(){
    var router = express.Router();
    
    router.post('/', function(req, res){
        var treeData = req.body;
        var root = new Space({
            'name': treeData.name,
            'resourcePath': treeData.resourcePath,
            'remark': treeData.remark,
            'childType': treeData.childType
        }).save(function(err, savedNode){
            var parse = function recursive(treeObjcet, parentNode){
                if(treeObjcet.children){
                    var children = treeObjcet.children;
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
            Space.findOne({parentId: null}, function(err, doc){
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
    
    router.get('/', function(req, res){
        var childType = req.query.childType;
        if(childType){
            res.locals.doc.getChildren({
                condition: { childType: childType }                
            }).then(function(docs){     
                console.log(docs);                       
                res.end(JSON.stringify(docs));
            })
        }
        // res.end('not implement');
    })
    
    router.get('/TreeJsonData', function(req, res){
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
    
    router.get('/SpaceName/:SpaceName', function(req, res){
        Space.findOne({parentId: null}).exec(function(err, doc){
            if(err) return console.error(err);
            doc.getChildren({
                condition: { name: req.params.SpaceName },
                fields:{name: 1, resourcePath: 1},
                sort: {name: 1}
            },function(err, docs){                 
                if(err) return console.error(err);                
                res.end(JSON.stringify(docs));
            })
        })        
    })
    
    router.get('/ChildType', function(req, res, next){        
        Space.find({childType: { $exists: false }}).select('childType').exec(function(err, docs){
            if(err) return console.error(err);            
            res.end(JSON.stringify(docs));
        })        
    })       
    
    router.put('/', function(req, res){
        // not implement
    })   
    
    
    router.delete('/', function(req, res){
        Space.remove({}, function(err){
            if(err) return console.error(err);
            res.end('delete');
        })
    })
    
    return router;
}