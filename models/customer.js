'use strict'

const mongoose = require('mongoose')
const Center = require('./center')
const Schema = mongoose.Schema

const CustomerSchema = new Schema({
    name: { type:String },
    last_name: { type:String },
    enterprise:{ type:String },
    nit: { type:Number }, //this is equal to cc or id number
    takeInInvoceByEmail: { type:Boolean, default:true },
    type:{ type:String, emun:['natural', 'juridico'] },
    treatment: { type:String, enum:['Sr.', 'Sra.', 'Dr.', 'Ing.', 'Lic.']  },
    plate:{type:String, unique:false},
    phone:{ type:Object, default:{ field:'', number:'' } },
    department: { type:String },
    city:{ type:String},
    email: { type:String },
    birthday:{ type:Date }, // Fecha nacimiento dia-mes
    centerId:{ type:Schema.ObjectId, ref:Center},
    centerCode:{ type:String},
    accountCode:{ type:String},
    create: { type:Date, default:Date.now() }
})

module.exports = mongoose.model('customer', CustomerSchema )