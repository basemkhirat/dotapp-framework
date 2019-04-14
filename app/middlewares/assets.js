var express = require("express");
var path = require("path");

export default express.static(path.join(process.cwd(), "public"));
