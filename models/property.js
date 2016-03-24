var mongoose = require('mongoose');

var PropertySchema = new mongoose.Schema({    
    name: String,    
    type: String,    
    
    //properties: []
})

// CategorySchema.plugin(materializedPlugin);
mongoose.model('Property', PropertySchema);
var model = mongoose.model('Property');
model.Schema = PropertySchema;

module.exports = model;