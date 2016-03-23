var mongoose = require('mongoose');
var materializedPlugin = require('mongoose-materialized');
var Schema = mongoose.Schema;

var SpaceResourcesSchema = new Schema({    
    name: String,
    resourcePath: String,
    childType: String,
    remark: String
})

SpaceResourcesSchema.plugin(materializedPlugin);
mongoose.model('SpaceResource', SpaceResourcesSchema);
var model = mongoose.model('SpaceResource');

module.exports = model;
