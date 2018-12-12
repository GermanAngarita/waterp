'use strict'

const Works = require('../models/workservice')

function newWorkService(req, res){
    const work = new Works({
        //Create date
        // create: { type:Date, defautl: Date.now() },

        // Owner service
        account: { type:Schema.ObjectId, ref:Account },
        center: { type:Schema.ObjectId, ref:Center },
        user: { type:Schema.ObjectId, ref:User },

        // Customer
        customer: { type:Schema.ObjectId, ref:Customer },
        customer_name: { type:String },
        customer_enterprise: { type:String },
        customer_nit: { type:Number },
        
        // Vehicle
        vehicle: { type:Schema.ObjectId, ref:Vehicle },
        vehicle_plate:{ type:String },
        vehicle_type:{ type:String },
        vehicle_use:{ type:String },

        // WorkService
        services:{ type:Array }, // service // descripcion // canti // sub_total
        total_value_before_tax:{ type:Number },
        tax:{ type:Number }, //Impuesto a las ventas 19%
        total_value: { type:Number},
        status: {type:String, enum:['Anulado', 'Pendiente', 'Pagada', 'Proceso'], default:'Proceso'}
    })

    work.save((err)=>{
        if(err) return res.status(500).send({msg:'Lo sentimos ocurrio un error al guardar el registro', err:err})
        res.status(200).send({msg:'Genial se ha guardado el registro con exito'})
    })
}

module.exports = {
    newWorkService
}