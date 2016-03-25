var restful = require('node-restful');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FacilitiesSchema = new Schema({
    name: String,
    fsc: Number,
    table: String,
    remark: String
})

var model = restful.model('Facility', FacilitiesSchema);

module.exports = model;