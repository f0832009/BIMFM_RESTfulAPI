var mongoose = require('mongoose');
var treePlugin = require('mongoose-tree');
var Schema = mongoose.Schema;

// var resourcesSchema = new Schema({    
//     name: String,
//     parentID: {type: Schema.Types.ObjectId, ref: 'Resources'},
//     layers: [{
//         name: String,
//         modelPath: String
//         }]    
// })

var SpaceResourcesSchema = new Schema({    
    name: String,
    resourcesPath: String,
    remark: String
})

SpaceResourcesSchema.plugin(treePlugin);
mongoose.model('Resources', SpaceResourcesSchema);
var model = mongoose.model('Resources');

module.exports = model;