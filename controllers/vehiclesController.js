'use strict'

const Vehicles = require('../models/vehicles')

function newVehicle(req, res){
    const vehicle = new Vehicles({
        plate: req.body.plate,
        type:  req.body.type, 
        use: req.body.use, 
        img: req.body.img, 
        centerId: req.body.centerId, 
        last_service: req.body.last_service,

        customer: req.body.customer,
        customer_nit: req.body.customer_nit,
        customer_name: req.body.customer_name,
        customer_enterprise: req.body.customer_enterprise
    })

    vehicle.save( (err)=>{
        if(err) return res.status(500).send({msg:'Error al guardar el vehículo', err:err})
        res.satus(200).send({msg:'Genial el vehículo se ha guardado con exito'})
    } )
}

function getVehicleByPlate(req, res){
    let plate = req.body.plate
    Vehicles.findOne( {plate:plate}, (err, vehicle)=>{
        if(err) return res.status(500).send({msg:'Error al obtener el vehículo', err:err})
        if(vehicle) { return res.status(200).send(vehicle) } else { return res.status(200).send({msg:'No se encontraron datos registrados'}) }
        
        
    })
}

function updateVehicle(req, res){
    let id = req.body._id;
    let update = req.body
    Vehicles.findByIdAndUpdate(id, update, (err, vehicle)=>{
        if(err) return res.status(500).send({msg:'Error al actualizar el vehículo'})
        res.status(200).send({msg:'Genial, el vehículo se actualizó con éxito'})
    })
}

module.exports = {
    newVehicle, //Sin route
    getVehicleByPlate, //Sin route
    updateVehicle
}