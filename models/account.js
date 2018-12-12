'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Plan = require('../models/plans')

const AccountSchema = new Schema({
	name:{ type:String, uppercase:true },
	code:{ type:String, minlength:5, maxlength:5, uppercase:true },
	nit:{ type:String },
	av:{ type:String, uppercase:true},
	
	logo:{ type:String, },
	email:{ type:String},
	address:{ type:String },
	city:{ type:String, uppercase:true },
	country:{ type:String, default:'Colombia', uppercase:true},
	telephone: { type:String, minlength:8, },
	contacts:{ type:Array },
	plan:{ type:Schema.ObjectId, ref:'Plan'},

	// Datos de Control
	active:{ type:Boolean, default:true},
	created: {type: Date, default: Date.now() }
})

module.exports = mongoose.model('Account', AccountSchema)
