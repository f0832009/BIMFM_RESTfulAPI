var mongoose = require('mongoose');
// var materializedPlugin = require('mongoose-materialized');
// var Schema = mongoose.Schema;

var PropertySchema = new mongoose.Schema({    
    name: String,    
    type: String,
    group: 
    properties: []
})

// CategorySchema.plugin(materializedPlugin);
mongoose.model('Property', FeaturesSchema);
var model = mongoose.model('Property');
model.Schema = PropertySchema;

module.exports = model;