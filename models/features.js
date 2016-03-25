var mongoose = require('mongoose');

var definition = require('./definitions');

var FeaturesSchema = new mongoose.Schema({    
    name: String,    
    remark: String,
    propertydefinitions: [definition.Schema]
})

mongoose.model('Feature', FeaturesSchema);
var model = mongoose.model('Feature');
model.Schema = FeaturesSchema;

module.exports = model;