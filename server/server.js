// to start
// nodemon if it is installed *or node server.js
// tsc -p ./ -w or npm start

var express = require('express');
var mongoose = require('mongoose');
var server = express();

server.use('/', express.static(__dirname + '/'));

server.listen(8080, () => {
    console.log('Exmple on port 8081!');
});


//db connection
//connect('mongodb://username:password@host:port/database')
// var db = mongoose.connect('mongodb://localhost/myapp', (err, db) => {
//     if (err) {
//         throw err;
//     }
//     console.log('Connected!');
// });
