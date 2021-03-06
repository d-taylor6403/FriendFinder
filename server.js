//Dependencies
var express = require("express");
var bodyParser= require("body-parser");
var path = require("path");

//Routes
var apiRoutes = require("./app/routing/apiRoutes");
var htmlRoutes = require("./app/routing/htmlRoutes");

//Set up Express App
var app = express();
var PORT = process.env.PORT || 3000;

//express middleware for static files
app.use(express.static("app/public"));

//Sets up the Express app to handle data parsing and formatting
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json"}));

apiRoutes(app);
htmlRoutes(app);

//Listener
app.listen(PORT, function() {
    console.log("app listening on port: ", PORT);
});


