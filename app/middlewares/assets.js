var express = require("express");
var path = require("path");

export default function () {
    return express.static(path.join(process.cwd(), "public"))
};
