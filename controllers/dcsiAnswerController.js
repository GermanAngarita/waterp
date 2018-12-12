'use strict'

const DcsiAnswers = require('../models/dcsianswer')

function newAnswer(req, res){
    const answer = new DcsiAnswers({
        account: req.body.account,
        center: req.body.center,
        customer: req.body.customer,
        workOrder: req.body.workOrder,
        min: req.body.min,
        max: req.body.max,
        dcsi: req.body.dcsi,
        // Control: Cod DSCI + ID Customer + ID Centro + Orden de Trabajo 
        control: req.body.dcsi+req.body.customer+req.body.center+req.body.workOrder.toString(),
        answer: req.body.answer
    })
    answer.save((err)=>{
        if(err) return res.status(500).send({msg:'Lo sentimos ocurrió un error al guardar la respuesta', err:err})
        res.status(200).send({msg:'La respuesta se ha guardado con exito, Muchas gracias!'})
    })
}

module.exports = {
    newAnswer
}