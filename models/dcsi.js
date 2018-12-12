'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const DCSISchema = new Schema({
    cod:{ type:String, unique:true },
    order:{type:Number, unique:true },
    class:{ type:String },
    max:{type:Number},
    min:{type:Number},
    question:{ type:String },
    details:{type:String},
    answer:{ type:Array, default:{ answerCode:'', answerText:''}}
})

module.exports = mongoose.model('DCSI', DCSISchema)