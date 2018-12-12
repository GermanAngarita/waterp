'use strict'

const mongoose = require('mongoose')
const Center = require('./center')
const Schema = mongoose.Schema

const TypeSchema = new Schema({
    name:{ type:String },
    description: { type:String },
    img:{ type:Array},
    active:{ type:Boolean, default:false}
})

module.exports = mongoose.model('Type', TypeSchema )