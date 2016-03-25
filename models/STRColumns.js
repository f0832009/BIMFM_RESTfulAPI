var restful = require('node-restful');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var STRColumnsSchema = new mongoose.Schema({    
    name: String,    
    uid: Number,
    fm_id: String,
    facility_id: { type: Schema.Types.ObjectId, ref: 'Facility' },
    // space_ids: [{ type: Schema.Types.ObjectId, ref: 'SpaceResource' }]
})

// mongoose.model('STRColumn', STRColumnsSchema);
// var model = mongoose.model('STRColumn');
var model = restful.model('STRColumn', STRColumnsSchema);

module.exports = model;