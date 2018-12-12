'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Account = mongoose.model('Account')

const CenterSchema = new Schema({
	name: { type:String },
	code: { type:String, minlength:5, maxlength:5, unique:true},
	zone: { type:String, minlength:2, maxlength:2, uppercase:true }, //z1,z2,z3, z4 y z5 Es la idea no?

	city:{ type:String},
	address:{ type:String },
	select:{ type:Boolean, default:false},
	//Setings
	viewValues:{ type:Boolean, default:true},
	// Datos de Control
	active:{ type:Boolean, default:true},
	created:{ type: Date, default: Date.now() },
	//Relational 
	account:{ type: Schema.ObjectId, ref:Account},

	//Settings
	seeCenterValues:{ type:Boolean, default:true},
	completedWithouInvoiced: {type:Boolean, default:false},
	requiredTakePicture:{type:Boolean, default:false},
	seeCustomerModule:{type:Boolean, default:true}
})

module.exports = mongoose.model('Center', CenterSchema)