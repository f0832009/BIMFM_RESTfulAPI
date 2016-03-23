var mongoose = require('mongoose');
var util = require('util');

module.exports = function(config){

  this.initializeDb = function(onSuccess){

    var url = '';

    if(config.user.length && config.pass.length){

      url = util.format('mongodb://%s:%s@%s:%d/%s',
        config.user,
        config.pass,
        config.dbhost,
        config.port,
        config.db);
    }
    else{

      url = util.format('mongodb://%s:%d/%s',
        config.dbhost,
        config.port,
        config.db);
    }

    mongoose.connect(url);
    
    var connection = mongoose.connection;
    
    connection.on('error', function() {
        console.error.bind(console, 'connection error:');
        process.exit(1);
    });
    
    connection.once('open', function(){
        console.log(config.db + ' connected!');
        onSuccess();
    });

  }
}