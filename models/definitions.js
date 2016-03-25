var mongoose = require('mongoose');

var DefinitionsSchema = new mongoose.Schema({    
    name: String,    
    type: String,
    // value: 
    //properties: []
})

mongoose.model('Definition', DefinitionsSchema);
var model = mongoose.model('Definition');
model.Schema = DefinitionsSchema;

module.exports = model;