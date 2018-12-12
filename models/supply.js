'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Account = require('../models/account')

const SupplySchema = new Schema({
    supply:{ type:String},
    description:{ type:String},
    reference:{ type:String},
    unity:{ type:String},
    cost :{type:String},
    quantity:{type:Number, default:1},
    account:[{type:Schema.ObjectId, ref:Account}]
})

module.exports = mongoose.model('Supply', SupplySchema)