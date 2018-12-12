'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Account = require('../models/account')
const Center = require('../models/center')
const bcrypt = require('bcrypt-nodejs')
const crypto = require('crypto')


/*
/*
/*  Modificar constructor del Modelo
/*   
**/
const UserSchema = new Schema({
    email: { type:String, unique: true, lowercase: true},
    name: {type:String, lowercase: true},
    last_name: {type:String, lowercase: true},
    active: {type:Boolean, default:true},
    role: String, // [ ADMIN | ACCOUNT | CENTER_SERVICE ]
    account: [{type: Schema.ObjectId, ref:Account}],
    centers: [{type:Schema.ObjectId, ref:Center}],
    avatar: String, //Opcional
    password: {type:String, select: true},
    singupDate: {type: Date, default: Date.now() },
    lastLogin: Date
})

UserSchema.pre('save', function (next){
    let user = this
    
    if(!user.isModified('password')) return next()

    bcrypt.genSalt(10, (err, salt)=>{
        if(err) return next(err)

        bcrypt.hash(user.password, salt, null, (err, hash)=>{
            if(err) return next(err)
            user.password = hash
            next()
        })
    })
})


UserSchema.methods.comparePass = function(password, cb){
    bcrypt.compare(password, this.password, (err, isMacht)=>{
        if(err) {return cb(err);}
        return cb(null, isMacht)
    })
}


module.exports = mongoose.model('User', UserSchema)

