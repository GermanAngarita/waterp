'use strict'

const mongoose = require('mongoose')
const Account = require('../models/account')
const Supply = require('../models/supply')
const Schema = mongoose.Schema

const ServiceSchema = new Schema({
    name:{ type:String},
    type:{type:String},
    code:{ type:String},
    description:{ type:String},
    value:{type:Number},
    cost:{type:Number},
    tax:{type:Number},
    supplys:{type:Array},
    account:{ type:Schema.ObjectId, ref:Account},
    img:{ type:Array},
    select:{ type:Boolean, default:false},
    active:{ type:Boolean, default:true},
    created:{type:Date, default: Date.now()}
})

module.exports = mongoose.model('Service', ServiceSchema)