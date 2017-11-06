var express = require('express');
var app = express();
var router = express.Router();

var path = require('path');

var morgan = require('morgan');
var bodyParser = require('body-parser');

var appRoutes = require('./app/routes/api')(router);

var port = process.env.PORT || 3000;

// Middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
app.use('/api', appRoutes);

app.listen(port, function () {
    console.log('listening on port ' + port);
});

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/public/app/views/index.html' ));
});
