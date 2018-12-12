'use strict'

const mongoose = require('mongoose')
const Center = require('./center')
const Account = require('./account')
const Schema = mongoose.Schema;

const RegService = new Schema({
    no:{type:Number},
    plate: { type:String },
    type_vehicle: { type:String },
    total:{ type:Number, default:0},
    tax:{ type:Number, default:0},
    service:{ type:Array },
    assign:{ type:Number },
    account_code: { type:String },
    center_code: { type:String },
    createdUp:{ type:Date, default:Date.now()},
    completedUp:{type:Date},
    minutesTake:{type:Number},
    value:{ type:Number},
    status:{type:String, enum:['process', 'invoiced', 'canceled', 'completed'], default:'process'},

    // Invoiced
    name: { type:String },
    last_name: { type:String },
    enterprise:{ type:String },
    nit: { type:Number }, //this is equal to cc or id number
    takeInInvoceByEmail: { type:Boolean, default:true },
    type:{ type:String, emun:['natural', 'juridico'] },
    treatment: { type:String, enum:['Sr.', 'Sra.', 'Dr.', 'Ing.', 'Lic.']  },
    
    phone:{ type:Object, default:{ field:'celular', number:'' } },
    department: { type:Number, default:12 },
    city:{ type:String },
    email: { type:String },
    
})

module.exports = mongoose.model('regServ', RegService);
