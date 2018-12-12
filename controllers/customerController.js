'use strict'

const Customer = require('../models/customer')

function newCustomer(req, res){


    const customer = new Customer({
        name: req.body.name, 
        last_name: req.body.last_name,
        enterprise: req.body.enterprise,
        nit: req.body.nit, 
        takeInInvoceByEmail: req.body.takeInInvoceByEmail, 
        type: req.body.type, 
        treatment: req.body.treatment, 
        plate: req.body.plate,
        phone: req.body.phone,
        department: req.body.department, 
        city: req.body.city,
        email: req.body.email,
        birthday: req.body.birthday, 
        centerId: req.body.centerId
    })

    if(customer.name){
        customer.name = customer.name.toLowerCase()
    }
    if(customer.last_name){
        customer.last_name = customer.last_name.toLowerCase()
    }
    if(customer.email){
        customer.email = customer.email.toLowerCase()
    }
    if(customer.enterprise){
        customer.enterprise = customer.enterprise.toLowerCase()
    }

    Customer.findOne({nit: customer.nit, plate:customer.plate}, (err, exist)=>{
        if(err) return res.status(500).send({msg:'Error al crear al cliente', err:err})
        if(exist && exist._id){
            Customer.findByIdAndUpdate( customer._id, customer, (err, success)=>{
                if(err) return res.status(500).send({msg:'Error al crear al cliente', err:err})
                res.status(200).send({msg:'Genial, el cliente se ha actualizado con éxito'})
            })
        } else {
            customer.save( (err)=>{
                if(err) return res.status(500).send({msg:'Error al crear al cliente', err:err})
                res.status(200).send({msg:'Genial, el cliente se ha creado con éxito'})
            } )
        }
    })
    
}

function upDateCustomer( req, res){
    let id = req.body._id
    let update = req.body

    Customer.findByIdAndUpdate( id, update, (err, customer)=>{
        if(err) return res.status(500).send({msg:'Error al actualizar el cliente', err:err})
        res.status(200).send({msg:'Genial!, se ha actualizado con éxito'})
    })
}

function getCustomerByPlate(req, res){
    let plate = req.body.plate
    Customer.findOne({plate:plate}, (err, customer)=>{
        if(err) return res.status(500).send({msg:'Error al Obtener los datos del cliente', err:err})
        res.status(200).send(customer)
    })
}

function getCustomerByNit(req, res){
    let nit = req.body.nit
    Customer.findOne({nit:nit}, (err, customer)=>{
        if(err) return res.status(500).send({msg:'Error al Obtener los datos del cliente', err:err})
        res.status(200).send(customer)
    })
}

function getCustomerByFilter(req, res){
    let accountCode = req.body.accountCode
    let name = new RegExp(req.body.name)
    let last_name = new RegExp(req.body.last_name)
    // let nit = new RegExp(req.body.nit)
    let type = req.body.type
    let plate = new RegExp(req.body.plate)
    let limit = req.body.limit
    let skip = req.body.skip
    Customer.find({
        name:name,
        last_name:last_name,
        // nit:nit,
        plate:plate,
        type:type
    }, (err, customer)=>{
        if(err) return res.status(500).send({msg:'Error al Obtener los datos del cliente', err:err})
        res.status(200).send(customer)
    }).skip(skip).limit(limit)
}

function getCountCustomerByFilter(req, res){
    let accountCode = req.body.accountCode
    let name = new RegExp(req.body.name)
    let last_name = new RegExp(req.body.last_name)
    // let nit = new RegExp(req.body.nit)
    let type = req.body.type
    let plate = new RegExp(req.body.plate)
    Customer.count({
        name:name,
        last_name:last_name,
        // nit:nit,
        plate:plate,
        type:type
    }, (err, customer)=>{
        if(err) return res.status(500).send({msg:'Error al Obtener los datos del cliente', err:err})
        res.status(200).send({count:customer})
    })
}

module.exports = {
    newCustomer,
    upDateCustomer,
    getCustomerByPlate,
    getCustomerByNit,
    getCustomerByFilter,
    getCountCustomerByFilter
}