var mongoose = require('mongoose');
// var materializedPlugin = require('mongoose-materialized');
// var Schema = mongoose.Schema;

var FeaturesSchema = new mongoose.Schema({    
    name: String,    
    remark: String,
    properties: []
})

// CategorySchema.plugin(materializedPlugin);
mongoose.model('Feature', FeaturesSchema);
var model = mongoose.model('Feature');
model.Schema = FeaturesSchema;

module.exports = model;