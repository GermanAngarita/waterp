'use strict'

const DCSI = require('../models/dcsi')

function newDCSI(req, res){
    const dcsi = new DCSI({
        cod:req.body.cod,
        order: req.body.order,
        class: req.body.class,
        question: req.body.question,
        details: req.body.details,
        answer: req.body.answer
    })

    // const dcsi = new DCSI({
    //     cod: 'SQ030',
    //     order: 3,
    //     class: 'AFTER SERVICE',
    //     question: 'De 1 a 10, visitaría nuevamente nuestro centro de servicio',
    //     details: 'Que tan dispuesto está el cliente a regresar',
    //     min:1,
    //     max:10,
    //     answer: [
    //         {value:1, answer:''},
    //         {value:2, answer:''},
    //         {value:3, answer:''},
    //         {value:4, answer:''},
    //         {value:5, answer:''},
    //         {value:6, answer:''},
    //         {value:7, answer:''},
    //         {value:8, answer:''},
    //         {value:9, answer:''},
    //         {value:10, answer:''},
    //     ]
    // })

    dcsi.save((err)=>{
        if(err) return res.status(500).send({msg:'Lo sentimos, ocurrio un error al crear el la pregunta', err:err})
        res.status(200).send({msg:'Genial, la pregunta se ha creado con éxito'})
    })
}

function getDCSI(req, res){
    DCSI.aggregate([
        {$sort:{order:1}}
    ], (err, dcsi)=>{
        if(err) return res.status(500).send({msg:'Lo sentimos ocurrio un error al traer las preguntas', err:err})
        res.status(200).send(dcsi)
    })
}

module.exports = {
    newDCSI,
    getDCSI
}