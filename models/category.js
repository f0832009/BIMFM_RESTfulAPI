var restful = require('node-restful');
var mongoose = require('mongoose');
// var materializedPlugin = require('mongoose-materialized');
var featureSchema = require('./features');
var Schema = mongoose.Schema;

var CategorySchema = new Schema({
    name: String,    
    remark: String,
    features: [{ type: Schema.Types.ObjectId, ref: 'Feature'}]
})

// CategorySchema.plugin(materializedPlugin);
var model = restful.model('Category', CategorySchema);

module.exports = model;