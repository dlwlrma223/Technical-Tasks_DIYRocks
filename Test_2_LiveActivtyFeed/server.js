var express = require('express');
var app = express();
var eventController = require("./eventController");

app.use(express.json());
app.use(express.static("public"));
app.use(eventController);

var server = app.listen(8080, function () {
    console.log("server start");
});
