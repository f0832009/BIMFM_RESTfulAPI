var mongoose = require('mongoose');
var materializedPlugin = require('mongoose-materialized');
// var Schema = mongoose.Schema;
var Property = require('./property');

var FeaturesSchema = new mongoose.Schema({    
    name: String,    
    remark: String,
    properties: [Property.Schema]
})

// CategorySchema.plugin(materializedPlugin);
mongoose.model('Feature', FeaturesSchema);
var model = mongoose.model('Feature');
model.Schema = FeaturesSchema;

module.exports = model;