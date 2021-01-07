http = require('http');
url = require('url');
require('dotenv').config
const readline = require('readline');
var uc = require('upper-case');
var cors = require('cors')
const nodemailer = require('nodemailer')
var express = require('express')
var app = express();
const bcrypt = require('bcrypt');
var bodyParser = require('body-parser')
var userController = require('./controllers/userController')
var corsOptions = {
    origin: ['http://127.0.0.1:5500','https://127.0.0.1:5500','http://localhost'],
    "methods": "HEAD,PUT,PATCH,POST,DELETE",
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }
app.use(bodyParser(),cors(corsOptions))
userController(app)

app.listen(5200)
