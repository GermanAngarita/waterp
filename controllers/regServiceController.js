'use strict'
const moment = require('moment')

const RegService = require('../models/reg_serv')
const Team = require('../models/team')
const Mail = require('../controllers/mailerController')

let transporter = Mail.transporter;

function newService(req, res){
    let consecutive = 0;
    RegService.count({
        account_code: req.body.account_code,
        center_code: req.body.center_code,
    }, (err, success)=>{
        if(err) return res.status(500).send({msg:'Error al comprobar el consecutivo'})
        consecutive = success;
        const newService = new RegService({
            no:consecutive,
            plate: req.body.plate,
            total: req.body.total,
            tax: req.body.tax,
            type_vehicle: req.body.type,
            service: req.body.service,
            assign: req.body.assign,
            account_code: req.body.account_code,
            center_code: req.body.center_code,
            city:''
        })
    
        newService.save( (err, success)=>{
            if(err) return res.status({msg:'Error al crear el servicio'})
            let lastdate = {status:'busy', lastUpdate:new Date()}

            Team.findOneAndUpdate({nit:newService.assign},lastdate, (err, success)=>{
                if(err) res.status({msg:'Error al actualizar al miembro del equipo'})
                res.status(200).send({msg:'Genial se ha registrado el servicio'})
            })
            
        })
    })
    
}
function getHistoryToCenter(req, res){
    let center_code = req.body.center_code;
    let account_code = req.body.account_code;
    let sort = req.body.sort;
    let skip = req.body.skip;
    let limit = req.body.limit;
    let placa = new RegExp(req.body.plate)
    let nit = req.body.assign
    let status = req.body.status
    let type = req.body.type
    RegService.find({
        center_code:center_code,
        account_code:account_code,
        plate:placa,
        assign:nit,
        status:status,
        type_vehicle:type
    }, (err, register)=>{
        if(err) return res.status(500).send({msg:'Error al obtener el historial', err:err})
        res.status(200).send(register)
    }).sort( {no:sort}).skip(skip).limit(limit)
}
function countHistoryToCenter(req, res){
    let center_code = req.body.center_code;
    let account_code = req.body.account_code;
    // let sort = req.body.sort;
    // let skip = req.body.skip;
    // let limit = req.body.limit;
    let placa = new RegExp(req.body.plate)
    let nit = req.body.assign
    let status = req.body.status
    let type = req.body.type
    RegService.count({
        center_code:center_code,
        account_code:account_code,
        plate:placa,
        assign:nit,
        status:status,
        type_vehicle:type
    }, (err, register)=>{
        if(err) return res.status(500).send({msg:'Error al obtener el historial'})
        res.status(200).send({count:register})
    })
}
function getTypesFromRegServices(req, res){
    RegService.distinct("type_vehicle", (err, types)=>{
        if(err) return res.status(500).send({msg:'Error al consultar los tipos de servicio'})
        res.status(200).send(types)
    })
}
function getRegServiceById(req, res){
    let id = req.body.id
    RegService.findById(id, (err, regService)=>{
        if(err) return res.status(500).send({msg:'Error al obtener el servicio', err:err})
        res.status(200).send(regService)
    })
}
function updateService(req, res){
    let id = req.body._id
    let body = req.body
    let assign = req.body.assign

    RegService.findByIdAndUpdate(id, body, (err, success)=>{
        if(err) return res.status(500).send({msg:'Lo sentimos ocurrió un error al actualizar el servicio', err:err})
        
        sendDocService(body)
        let lastdate = {status:'available', lastUpdate:new Date()}
        Team.findOneAndUpdate({nit:assign},lastdate, (err, success)=>{
            if(err) res.status({msg:'Error al actualizar al miembro del equipo'})
            res.status(200).send({msg:'Genial se ha registrado el servicio'})
        })


    })
}
function sendDocService(data){
    let completedUp = moment(data.completedUp).format('DD-MM-YYYY')
    let services = ''
    // Completar la vista de servicios
    for(let i of data.service){
        services += `<tr>
            <td width="160" style="font-size: 1.5ch; border-color:#7E8083; border-style:solid; border-width:0.5px; padding-left:15px; padding-right:15px; font-family: Arial, sans-serif;">
                ${i.name}
            </td>
            <td width="160" style="font-size: 1.5ch; border-color:#7E8083; border-style:solid; border-width:0.5px; padding-left:15px; padding-right:15px; font-family: Arial, sans-serif;">
                ${i.type}
            </td>
            <td width="260" style="font-size: 1.5ch; border-color:#7E8083; border-style:solid; border-width:0.5px; padding-left:15px; padding-right:15px; font-family: Arial, sans-serif;">
                ${i.description}
            </td>
            <td width="160" style="font-size: 1.5ch; border-color:#7E8083; border-style:solid; border-width:0.5px; padding-left:15px; padding-right:15px; font-family: Arial, sans-serif;">
                ${i.tax}
            </td>
            <td width="160" style="font-size: 1.5ch; border-color:#7E8083; border-style:solid; border-width:0.5px; padding-left:15px; padding-right:15px; font-family: Arial, sans-serif;">
                ${i.value}
            </td>
        </tr>`
    }


    const mailOptions = {
        from:'Kia After Sales Consulting <germanadolfoangarita@gmail.com>',
        to:  data.email,
        subject:'[KASC] Notificación seguridad: Cambio de contraseña',
        // text: `${JSON.stringify(data)} `,
        html:`<!DOCTYPE html>
        <html xmlns="http://www.w3.org/1999/xhtml" lang="en">
        <head>
            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
            <meta name="viewport" content=" initial-scale=1.0"/>
            <meta charset="UTF-8">
            <title>[KASC] Notificación Compromiso</title>
        </head>
        <body bgcolor="#eee" style="margin: 0; padding: 0;font-size:16px; font-family: 'Arial', Tahoma, Geneva, Verdana, sans-serif">
         
            <table bgcolor="#fff" align="center" cellpading="0" width="640" border="0" cellpadding="0" cellspacing="0" style="margin-top:15px; border-collapse: collapse;">
                <tr bgcolor="#343a40" >
                    <td align="right" style="padding-bottom:5px; padding-top:5px; padding-right:5px;">
                        <a href="" style="font-size:0.6em; font-family: Arial, sans-serif; color:#eeeeee; text-decoration:none;"> Standard Systems { }</a>
                    </td>
                </tr>
                <tr bgcolor="#fff">
                    <td width="100%">
                        <table  border="0" cellpadding="0" cellspacing="0" width="100%">
                            <tr>&nbsp;</tr>
                            <tr style="margin-top:15px;">
                                <td align="left" style="padding-left:15px;">
                                    <img width="80" height="auto" style="display: block;" src="https://app.kia.com.co/assets/logo_kasc.png" alt="">
                                </td>
                                <!-- <td align="right" style="padding-right:15px;">
                                    <img width="160" height="auto" style="display: block;" src="https://app.kia.com.co/assets/kia_promise_to_care.png" alt="">
                                </td> -->
                            </tr>
                            <tr bgcolor="#fff" align="left">
                                <td width="640" style="padding-left:15px; padding-right:15px; font-family: Arial, sans-serif;">
                                    <br>
                                    <strong>Información básica</strong>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <table>
                                        <tr>
                                            <td width="160" style=" padding-left:15px; padding-right:15px; font-family: Arial, sans-serif;">
                                                <small style="font-size: 10px;">Placa</small> <br>
                                                ${data.plate}
                                            </td>
                                            <td width="160" style="padding-left:15px; padding-right:15px; font-family: Arial, sans-serif;">
                                                <small style="font-size: 10px;">Tipo</small> <br>
                                                ${data.type_vehicle}
                                            </td>
                                            <td width="160" style="padding-left:15px; padding-right:15px; font-family: Arial, sans-serif;">
                                                <small style="font-size: 10px;">Operario</small> <br>
                                                ${data.assign}
                                            </td>
                                            <td width="160" style="padding-left:15px; padding-right:15px; font-family: Arial, sans-serif;">
                                                <small style="font-size: 10px;">Centro S.</small> <br>
                                                ${data.center_code}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td width="160" style="padding-left:15px; padding-right:15px; font-family: Arial, sans-serif;">
                                                <small style="font-size: 10px;">Nombre</small> <br>
                                                ${data.treatment} ${data.name}
                                            </td>
                                            <td width="160" style="padding-left:15px; padding-right:15px; font-family: Arial, sans-serif;">
                                                <small style="font-size: 10px;">Apellido</small> <br>
                                                ${data.last_name}
                                            </td>
                                            <td width="160" style="padding-left:15px; padding-right:15px; font-family: Arial, sans-serif;">
                                                <small style="font-size: 10px;">Tipo</small> <br>
                                                ${data.type}
                                            </td>
                                            <td width="160" style="padding-left:15px; padding-right:15px; font-family: Arial, sans-serif;">
                                                <small style="font-size: 10px;">Fecha servicio</small> <br>
                                                ${completedUp}
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td width="100%">
                        <table>
                            <tr> &nbsp;</tr>
                            <tr>
                                <td style="padding-left:15px; padding-right:15px;">
                                    <strong>Servicios</strong>
                                </td>
                            </tr>
                            <tr>
                                <td width="100%" style="padding-left:15px; padding-right:15px; font-family: Arial, sans-serif;">
                                    <table cellpading="0" width="640" border="1" cellpadding="0" cellspacing="0">
                                        <tr bgcolor="#343a40">
                                            <td width="160" style="font-size: 1.5ch; color:#eeeeee; padding-left:15px; padding-right:15px; font-family: Arial, sans-serif;">
                                                <strong>Servicio</strong>
                                            </td>
                                            <td width="60" style="font-size: 1.5ch; color:#eeeeee; padding-left:15px; padding-right:15px; font-family: Arial, sans-serif;">
                                                <strong>Tipo</strong>
                                            </td>
                                            <td width="200" style="font-size: 1.5ch; color:#eeeeee; padding-left:15px; padding-right:15px; font-family: Arial, sans-serif;">
                                                <strong>Descripción</strong>
                                            </td>
                                            <td width="50" style="font-size: 1.5ch; color:#eeeeee; padding-left:15px; padding-right:15px; font-family: Arial, sans-serif;">
                                                <strong>Iva</strong>
                                            </td>
                                            <td width="160" style="font-size: 1.5ch; color:#eeeeee; padding-left:15px; padding-right:15px; font-family: Arial, sans-serif;">
                                                <strong>Valor</strong>
                                            </td>
                                        </tr>
                                        ${services}
                                    </table>
                                </td>
                            </tr>
                            <tr>
                                <td width="100%" style="padding-left:15px; padding-right:15px; font-family: Arial, sans-serif;">
                                    <table cellpading="0" width="640" border="1" cellpadding="0" cellspacing="0">
                                        <tr>
                                            <td width="420" style="font-size: 1.5ch;">
                                                Total
                                            </td>
                                            <td width="50" style="font-size: 1.5ch;">
                                                ${data.tax}
                                            </td>
                                            <td width="160" style="font-size: 1.5ch;">
                                                ${data.total}
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr bgcolor="#343a40">
                    <td style="font-size:12px; color:rgb(180, 180, 180); padding-left: 15px; padding-top:15px; padding-right:15px; padding-bottom: 15px;">
                        <span style="font-family: Arial, sans-serif; font-size:12px;">
                            <strong>Metrokia S.A</strong> Posventa Importadora <br> 
                            <strong>D</strong> Calle 224 No. 9 - 60, <strong>T</strong> 364 9700 Ext 1264 <strong>E</strong> <a style="text-decoration:none; color:rgb(180, 180, 180);" href="mailto:mtkingdespos@kia.com.co"> mtkingdespos@kia.com.co</a> <br>
                            <small>Bogotá D.C. – Colombia</small>
                        </span> <br> <br>
                        <span style="font-family: Arial, sans-serif; text-align:justify; color:rgb(131, 130, 130);">
                            <small>
                                Este correo y cualquier archivo anexo pertenecen a METROKIA S.A. y son para uso exclusivo del destinatario intencional. 
                                Esta comunicación puede contener información confidencial o de acceso privilegiado. Si usted ha recibido este correo por 
                                error, equivocación u omisión favor notificar en forma inmediata al remitente y eliminar dicho mensaje con sus anexos. 
                                La utilización, copia, impresión, retención, divulgación, reenvió o cualquier acción tomada sobre este mensaje y sus 
                                anexos queda estrictamente prohibido y puede ser sancionado legalmente.         <strong>¡Yo también soy Cero Papel!</strong>
                            </small>
                        </span>
                    </td>
                </tr>
            </table>
        
        </body>
        </html>
        `
    }

    transporter.sendMail(mailOptions, (err, info)=>{
        if(err) return console.info('Error al actualizar al miembro del equipo: '+err)
        return true
    })
    
} 




module.exports = {
    newService,
    getHistoryToCenter,
    countHistoryToCenter,
    getTypesFromRegServices,
    getRegServiceById,
    updateService
}