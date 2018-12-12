'use strict'

const mongoose = require('mongoose')
const Center = require('../models/center')
const ObjectId = mongoose.Types.ObjectId

const select = false

function centerCount(req, res){
    Center.count({}, (err, count)=>{
        if(err) return res.status(500).send({msg:`Error al Obtener los datos ${err}`})
        res.status(200).send({count:count})
    })
}

function newCenter(req, res){
    const center = new Center({
        name: req.body.name,
        code: req.body.code,
        zone: req.body.zone, //z1,z2,z3, z4 y z5 Es la idea no?
        city: req.body.city,
        address: req.body.address,
        account: req.body.account
    })
    center.save((err)=>{
        if(err) return res.status(500).send({msg:`Error al crear el centro de servicio ${err}`})
        res.status(200).send({msg:`Se ha creado con exito.`})
    })
    
}
// Obtener los centros de servicio para cada cuenta
function getCenterById(req, res){
    let id = req.body.id
    let skip = req.body.skip
    let limit = req.body.limit
    Center.aggregate([
        { $match: { account:ObjectId(id) } },
        { $skip:skip},
        { $limit:limit},
        { $project:{
            _id:1,
            name:"$name",
            code:"$code",
            zone:"$zone",
            city:"$city",
            address:"$address",
            account:"$account",
            created:"$created",
            active:"$active",
            select: "$select"
        }}
    ], (err, center)=>{
        if(err) return res.status(500).send({msg:`Error al consultar los Centros ${err}`})
        res.status(200).send(center)
    })
}
// Contar los servicios totales de cierta cuenta
function getCountCenterById(req, res){
    let id = req.body.id
    Center.count({account:ObjectId(id)}, (err, count)=>{
        if(err) return res.status(500).send({msg:'Error al contar los datos', err:err})
        res.status(200).send({total:count})
    })
}

function editCenter(req, res){
    let id = req.body._id
    let update = req.body

    Center.findByIdAndUpdate(id,update, (err, center)=>{
        if(err) return res.status(500).send({msg:`Error al editar el centro de servicio ${err}`})
        res.status(200).send({msg:`Se han guardado los cambios`})
    })
}

function getCenters(req, res){
    let active = req.body.active
    Center.aggregate([
        { $match: { active:{ $in:active } }}
    ],(err, center)=>{
        if(err) res.status(500).send({msg:`Error al obtener los centros de servicio`})
        res.status(200).send(center)
    })
}

function findCenterById(req, res){
    let id = req.params.id
    Center.findById(id, (err, center)=>{
        if(err) return res.status(500).send({msg:`Error al obtener la información ${err}`})
        res.status(200).send(center)
    })
}

function findCentersById(req, res){
    let centersId = []
    for(let i of req.body.centers){
        centersId.push( ObjectId(i) )
    }
    Center.aggregate([
        { $match: { _id: { $in:centersId }}}
    ], (err, centers)=>{
        if(err) return res.satus(500).send({msg:'error al obtener los centros de servicio', err:err})
        res.status(200).send(centers)
    })
}

function getDataCenterToId(req, res){
    let id = ObjectId(req.body.id)
    Center.findById(id, (err, center)=>{
        if(err) return res.status(500).send({msg:'Error al consultar la información del centro de servicio, inténtelo más tarde'})
        res.status(200).send(center)
    })
}

module.exports = {
    centerCount,
    newCenter,
    getCenterById,
    getCountCenterById,
    editCenter,
    getCenters,
    findCenterById,
    findCentersById,
    getDataCenterToId
}