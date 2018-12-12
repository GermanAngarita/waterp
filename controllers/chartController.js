'use stric'

const regServ = require('../models/reg_serv')
const moment = require('moment')

function serviceByCenter(req, res){
    let accountCode= req.body.accountCode
    let optionSelect = req.body.optionSelect
    let today = moment().format('YYYY-MM-DD')
    let status = req.body.status
    let init = ''
    let end = ''
    
    if(optionSelect=='day'){
        init = moment(today, 'YYYY-MM-DD').format()
        end = moment(init).add(24,'hours').format()
    } else if(optionSelect=='month'){
        init = moment('01'+moment(today).format('MMYYYY'), 'DDMMYYYY').format()
        end = moment('01'+moment().format('MMYYYY'), 'DDMMYYYY').add(1, 'month').format()
    } else if(optionSelect=='week'){
        init = moment(moment(today).subtract(7, 'days').format('DDMMYYYY'), 'DDMMYYYY').format()
        end = moment(today, 'YYYY-MM-DD').add(24,'hours').format()
    } else if(optionSelect=='year'){
        end = moment(today, 'YYYY-MM-DD').add(24,'hours').format()
        init = moment(init).subtract(1,'year').format()
    }

    regServ.aggregate([
        { $match: { account_code:accountCode }},
        { $match: { status:{ $in:status}}},
        { $match:{ createdUp:{ $gte:new Date(init) } }},
        { $match:{ createdUp:{ $lte:new Date(end) } }},
        { $group:{
            _id:{ center:"$center_code", value:"$total", tax:"$tax"},
            total:{ $sum:1}
        }},
        { $group:{
            _id:"$_id.center",
            count:{ $sum:"$total"},
            value:{ $sum:"$_id.value"},
            tax:{ $sum:"$_id.tax"}
        }}
    ], (err, regservices)=>{
        if(err) res.status(500).send({msg:'Ocurrio un error al obtener los servicio por centro', err:err})
        res.status(200).send(formatDataChart(regservices, init, end))
        
    })
}
// transform data
function formatDataChart(data, init, end){
    let result = { 
        labels:[],
        count:[],
        value:[],
        tax:[],
        ticket:[],
        date:{init:init, end:end}
     }
    if(data){
        for(let i of data){
            result.labels.push(i._id)
            result.count.push(i.count)
            result.value.push(i.value/1000)
            result.tax.push(i.tax/1000)
            result.ticket.push( (Math.round(i.value/i.count*100)/100)/1000 )
        }
    }
    return result;
}

module.exports = {
    serviceByCenter
}