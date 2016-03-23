var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var facilitiesSchema = new Schema({
    name: String,
    fsc: Number,
    element: [{
        uid: Number,
        fm_id: Number,
        name: String,
        resource_id:{
            type: Schema.Types.ObjectId,
            ref: 'Resources'
        }
    }]    
})

mongoose.model('Facilities', facilitiesSchema);
var facilities = mongoose.model('Facilities');

module.export = facilities;
