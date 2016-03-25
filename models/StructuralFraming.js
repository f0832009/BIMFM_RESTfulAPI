var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var StructuralFramingSchema = new mongoose.Schema({    
    name: String,    
    uid: Number,
    fm_id: Number,
    facility_id: { type: Schema.Types.ObjectId, ref: 'Facility' },
    space_ids: [{ type: Schema.Types.ObjectId, ref: 'SpaceResource' }]
})

mongoose.model('StructuralFraming', StructuralFramingSchema);
var model = mongoose.model('StructuralFraming');

module.exports = model;