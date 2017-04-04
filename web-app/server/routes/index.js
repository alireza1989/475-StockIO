"use strict";

var fs        = require("fs");
var path      = require("path");

var routes = {};
fs.readdirSync(__dirname).filter(function(file) {
    return (file.indexOf(".") !== 0) && (file !== "index.js");
}).forEach(function(file) {
    var fileName = file.slice(0, -3);
    routes[fileName] = require('./' + file);
});

module.exports = routes;
