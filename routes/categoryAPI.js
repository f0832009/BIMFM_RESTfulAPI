var mongoose = require('mongoose');
var category = require('../models/category');

module.exports = function(app){    
    category.methods(['get', 'post', 'put', 'delete']);
    category.register(app, '/category');    
}