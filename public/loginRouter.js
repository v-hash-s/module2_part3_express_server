"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.users = exports.token = void 0;
var express = require('express');
var router = express.Router();
var path = require('path');
var app = express();
var cookieParser = require('cookie-parser');
app.use(cookieParser());
exports.token = {
    'token': 'token',
};
exports.users = {
    'asergeev@flo.team': 'jgF5tn4F',
    'vkotikov@flo.team': 'po3FGas8',
    'tpupkin@flo.team': 'tpupkin@flo.team',
};
app.use(express.static(path.join(__dirname, '../static/pages')));
router.options('/', function (req, res) {
    res.header({ 'Access-Control-Allow-Origin': '*' });
    res.header({ 'Access-Control-Allow-Credentials': 'true' });
    res.header({ 'Access-Control-Allow-Methods': 'OPTIONS, GET, POST' });
    res.header({ 'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Access-Control-Allow-Origin, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers' });
    res.header('Application-Type', 'multipart/form-data');
    res.send();
});
router.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '../static/pages/index.html'));
});
router.post('/', function (req, res) {
    console.log("Body: " + JSON.stringify(req.body));
    if (req.body.email in exports.users && req.body.password === exports.users[req.body.email]) {
        // process.env['isValid'] = "true";
        res.cookie('token', 'token');
        res.header("Authorization", 'token');
        res.header({ 'Access-Control-Allow-Origin': '*' });
        res.status(200);
        // res.header( {'Authorization' : token})
        res.send(JSON.stringify(exports.token));
    }
    else {
        res.status(401);
        res.send({ errorMessage: 'Invalid email or password' });
    }
});
// other.ts
module.exports = router;
