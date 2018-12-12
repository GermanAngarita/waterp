'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const api = require('./routes')
const cors = require('cors')

const corsOptions = {
  origin: 'http://localhost:4200',
  credentials: true,

}

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(cors(corsOptions))
app.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Methods", "POST, GET");
    res.header("Access-Control-Allow-Origin", "http://localhost:4200");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Credentials", true);
    next();
  });
app.use(express.static('uploads'))
app.use(express.static('assets'))
app.use('/api', api)



module.exports = app