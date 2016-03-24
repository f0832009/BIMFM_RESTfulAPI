var mongoose = require('mongoose');
// var express = require('express');
var category = require('../models/category');

module.exports = function(app){
    // var app = express();
    category.methods(['get', 'post', 'put', 'delete']);
    category.register(app, '/category');    
}