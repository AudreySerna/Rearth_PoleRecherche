var express = require('express');
var app = express();

// set the port of our application
var port = process.env.PORT || 8080;

app.use(express.static(__dirname + "/app"));

//set home page
app.get('/', function(req, res) {
	res.render('index');
});

app.listen(port, function() {
	console.log("cest tout bon sur le porc " + port);
});