'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Account =require('../models/account')
const Center = require('../models/center')

const DCSIAnswerSchema = new Schema({
    account:{type:Schema.ObjectId, ref:Account},
    center:{type:Schema.ObjectId, ref:Center},
    customer:{type:String},
    min:{type:String},
    max:{type:String},
    dcsi:{type:String},
    answer:{type:String},
    control:{type:String, unique:true},
    created:{type:Date, default: Date.now()}
})

module.exports = mongoose.model('DcsiAnswers', DCSIAnswerSchema)