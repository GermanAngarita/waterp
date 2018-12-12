'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const WorksOrdersSchema = new Schema({
    create: { type:Date, default:Date.now() },
    notes:{ type:Array, default:[]},
    id:{ type:Number },
    // datos del cliente
    name:{ type:String },
    last_name:{ type:String },
    nit:{ type:String },
    email:{ type:String },
    telephone:{ type:String },

    // Datos del vehículo
    plate:{ type:String},
    model:{ type:String},
    brand:{ type:String},
    year:{ type:String},
    status:{ type:String, default:'reception' },
    reception_info:{ type:Object, default:{ status:'process', date:''}},
    evaluation_info:{ type:Object, default:{ status:'pending', date:''}},
    quotation_info:{ type:Object, default:{ status:'pending', date:''}},
    approval_info:{ type:Object, default:{ status:'pending', date:''}},
    // Datos del proceso
    process:{type:Array, default:[
                    {
                        name:'Recepcion',
                        status:0,
                        value:0.25,
                        
                        checkList:[
                                {
                                item:'Frente',
                                description:'Revise la parte frontal del vehículo',
                                status:'secondary', // success, danger, warning
                                attach:[]
                            },
                            {
                                item:'Lateral izquierdo',
                                description:'Revise la parte lateral izquierda del vehículo',
                                status:'secondary', // success, danger, warning
                                attach:[]
                            },
                            {
                                item:'Latareal derecha',
                                description:'Revise la parte lateral derecha del vehículo',
                                status:'secondary', // success, danger, warning
                                attach:[]
                            },
                            {
                                item:'Trasera o posterior',
                                description:'Revise la parte trasera o posterios del vehículo',
                                status:'secondary', // success, danger, warning
                                attach:[]
                            },
                            {
                                item:'Motor',
                                description:'Revise el motor del vehículo',
                                status:'secondary', // success, danger, warning
                                attach:[]
                            },
                        ] 
                    },
                    {
                        name:'Diagnostico',
                        status:0,
                        value:0.25,
                        checkList:[] 
                    },
                    {
                        name:'Cotizacion',
                        status:0,
                        value:0.25,
                        checkList:[] 
                    }
                ]},
    total:{ type:Number, default:0 },
    parts:{ type:Number, default:0 },
    mo:{ type:Number, default:0 },
    total_approve:{ type:Number, default:0 },
    parts_approve:{ type:Number, default:0 },
    mo_approve:{ type:Number, default:0 },
    total_ban:{ type:Number, default:0 },
    parts_ban:{ type:Number, default:0 },
    mo_ban:{ type:Number, default:0 },
    customer_response:{type:Boolean, default:false},
    reception:{ type:Boolean, default:false}

})

module.exports = mongoose.model('worksOrders', WorksOrdersSchema)