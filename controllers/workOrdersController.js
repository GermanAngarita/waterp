'use strict'

const WorkOrders = require('../models/works_orders')
const fs = require('fs')
const multer = require('multer')
const Mail = require('./mailerController')

let transporter = Mail.transporter;


function newOrder(req, res){

    WorkOrders.count({}, (err, count)=>{
        if(err) return res.status(500).send({msg:'Error al contar las ordenes'})
        const workOrdes = new WorkOrders({
            id: count+1,
            name: req.body.name,
            last_name: req.body.last_name,
            nit: req.body.nit,
            email: req.body.email,
            telephone: req.body.telephone,
            plate: req.body.plate.toUpperCase(),
            model: req.body.model,
            brand: req.body.brand,
            year: req.body.year,
        })

        workOrdes.save((err)=>{
            if(err) return res.status(500).send({msg:'Error al contar las ordenes'})
            res.status(200).send({msg:'se ha guardado con exito'})
        })
    })
}

function updateOrder(req, res){
    let id = req.body._id;
    let body = req.body
    WorkOrders.findByIdAndUpdate(id, body, (err, success)=>{
        if(err) return res.status(500).send({msg:'Error al actualizar la orden'})
        res.status(200).send(success)
    })
}

function getOrders(req, res){
    let limit = req.body.limit;
    let skip = req.body.skip;

    let plate = new RegExp(req.body.plate)
    WorkOrders.find({
        plate:plate
    }, (err, orders)=>{
        if(err) return res.status(500).send({msg:'Error al obtener las ordenes'})
        res.status(200).send(orders)
    }).skip(skip).limit(limit).sort({id:-1})
}

function countOrders(req, res){
    WorkOrders.count({}, (err, count)=>{
        if(err) return res.status(500).send({msg:'Error al contar las ordenes'})
        res.status(200).send({count:count})
    })
}

function getOrderById(req, res){
    let id = req.body.id
    WorkOrders.findById(id, (err, order)=>{
        if(err) return res.status(500).send({msg:'Error al obtener las ordenes'})
        res.status(200).send(order)
    })
}


// function createAccountDir(account){
//     let dirname = './uploads/profiles/'+account+'/';
//     fs.mkdir(dirname, (err)=>{
//         if(err && err.code == 'EEXIST'){
//             // nothing to do
//         } else if(err) {
//             return res.status(500).send({msg:'Error al crear el directorio', err:err})
//         }
//     })
// }

function uploadImgProfile(req, res){
    let name = '';
    let originalname = '';

    const storage = multer.diskStorage({
        destination: (req, file, cb)=>{
            // createAccountDir(req.body.account_code)
            cb(null, './uploads/attach/');
            // cb(null, './uploads/profiles/'+req.body.account_code+'/');
        },
        filename: (req, file, cb)=>{
            const datetimemap = Date.now()
            name = req.body.item+'-'+datetimemap+'.'+file.originalname.split('.')[file.originalname.split('.').length-1];
            originalname = file.originalname;
            cb(null, name)
        }
    });
    const upload = multer({
        storage: storage
    }).single('file');
    upload(req, res, (err)=>{
        if(err) return res.status(500).send({msg:'Ocurrió un error al cargar el archivo', err:err})
        res.status(200).send({msg:'Cargado con exito', filename:name, originalname:originalname})
    })
}


function sendEmail(req, res){
    // let data = req.body;
    let data = req.body;
    const mailOptions = {
        from:'Mecappnica Diagnóstico <standardsystems.developer@gmail.com>',
        to:  data.email+'; germanadolfoangarita@gmail.com;',
        subject:'[Diagnostico] Hemos terminado el diagnóstico',
        // text: `${JSON.stringify(data)} `,
        html:`<!DOCTYPE html>
        <html xmlns="http://www.w3.org/1999/xhtml" lang="en">
        <head>
            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
            <meta name="viewport" content=" initial-scale=1.0"/>
            <meta charset="UTF-8">
            <title>[KASC] Resultados TMOG</title>
        </head>
        <body bgcolor="#343a40" style="background-color: #f8f9fa; margin: 0; padding: 0;font-size:16px; font-family: 'Arial', Tahoma, Geneva, Verdana, sans-serif">
         
            <table bgcolor="#fff" align="center" cellpading="0" width="640" border="0" cellpadding="0" cellspacing="0" style="background-color: rgb(255, 255, 255); margin-top:15px; border-collapse: collapse;">
                <tr bgcolor="#6c757d" >
                    <td align="right" style="padding-bottom:5px; padding-top:5px; padding-right:5px;">
                        <a href="" style="font-size:0.6em; font-family: Arial, sans-serif; color:#eeeeee; text-decoration:none;">AftechSales | mecappnica</a>
                    </td>
                </tr>
                <tr bgcolor="#fff" style="background-color:#fff">
                    <td width="100%">
                        <table  border="0" cellpadding="0" cellspacing="0" width="100%">
                            <tr>&nbsp;</tr>
                            <tr style="margin-top:15px;">
                                <td align="center" style="padding-left:15px;">
                                    <img align="center" width="80" height="auto" style="display: block;" src="http://app.mibbu.com/assets/logo_mapp.png" alt="">
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr bgcolor="#fff" align="center" style="background-color:#fff">
                    <td style="font-family: Arial, sans-serif;">
                        <br>
                        <p>Estimad(@) ${data.name} ${data.last_name}</p>
                        <small>____ _ ____</small>
                    </td>
                </tr>
                <tr align="center" bgcolor="#fff" style="background-color:#fff">
                    <td style="font-family: Arial, sans-serif; padding-left:16px; padding-right:15px; padding-bottom: 15px;"  >
                        <br>
                        <h3 style="color:#212529;"> Hemos terminado el diagnóstico de su vehículo, puede consultar nuestras recomendaciones haciendo clic en los resultados </h3>
                        <br>
                        
                        <br>
                        
                        <span style="color:#6c757d"> <small>Muchas gracias por su visita:</small> <br>
                            Para la cotización por favor clic en el siguiente botón
                        </span> <br>
                        <small>____ _ ____</small>
                    </td>
                </tr>
                <tr align="center" bgcolor="#fff" style="background-color:#fff">
                    <td style="padding-left: 15px; padding-top:15px; padding-right:15px; padding-bottom: 15px;" >
                        <table border="0" cellpadding="0" cellspacing="0" width="100%">
                            <tr align="center">
                                <td width="190" style="padding-top:15px; padding-bottom:15px;"></td>
                                <td width="260" bgcolor="#0000ff" style="color:#fff; padding-left:15px; padding-right:15px; padding-top:15px; padding-bottom:15px;">
                                    <a style="font-family: Arial, sans-serif; color:#f8f9fa; text-decoration:none;" href="http://localhost:4200/#/workshop/quotation/${data._id}">
                                        Ver Cotización
                                    </a>
                                </td>
                                <td width="190" style="padding-top:15px; padding-bottom:15px;"></td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr bgcolor="#6c757d">
                    <td style="font-size:12px; color:rgb(255, 253, 253); padding-left: 15px; padding-top:15px; padding-right:15px; padding-bottom: 15px;">
                        <span style="font-family: Arial, sans-serif; font-size:12px;">
                            <strong>AftechSales S.A.S.</strong> Mecappnica <br> 
                            <strong>D</strong> Calle 127 No. 9 - 60, <strong>T</strong> 3007410908 <strong>E</strong> <a style="text-decoration:none; color:rgb(255, 253, 253);" href="mailto:germanadolfoangarita@gmail.com"> germanadolfoangarita@gmail.com</a> <br>
                            <small>Bogotá D.C. – Colombia</small>
                        </span> <br> <br>
                        <span style="font-family: Arial, sans-serif; text-align:justify; color:rgb(255, 255, 255);">
                            <small style="text-align:justify;">
                                Este correo y cualquier archivo anexo pertenecen a AftechSales S.A.S. y son para uso exclusivo del destinatario intencional. 
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

    transporter.sendMail(mailOptions, (err)=>{
        if(err) return res.status(500).send({msg:'ocurrió un error al enviar el mensaje', err:err})
        res.status(200).send({msg:'Mensaje enviado'})
    })
}

module.exports = {
    newOrder,
    getOrders,
    countOrders,
    getOrderById,
    updateOrder,
    uploadImgProfile,
    sendEmail
}