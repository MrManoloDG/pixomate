const app = require('./server'),
    sequelize = require('./db'),
    port = process.env.PORT || 8080,
    http = require('http');



sequelize.authenticate().then(()=> {
    console.log('Connection has been established successfully.');
}, error => {
    console.error('Unable to connect to the database:', error);
});

http.createServer(app).listen(port, function() {
    console.log('Server started on: ' + port);
});