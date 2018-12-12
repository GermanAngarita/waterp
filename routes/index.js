'use strict'

const express = require('express')
const users = require('../controllers/userController')
const account = require('../controllers/accountController')
const plans = require('../controllers/plansController')
const center = require('../controllers/centerController')
const supplys = require('../controllers/supplyController')
const service = require('../controllers/serviceController')
const survey = require('../controllers/dcsiController')
const list = require('../controllers/listServiceController')
const types = require('../controllers/typeController')
const vehicles = require('../controllers/vehiclesController')
const team = require('../controllers/teamController')
const regService = require('../controllers/regServiceController')
const customer = require('../controllers/customerController')
const chart = require('../controllers/chartController')
const mail = require('../controllers/mailerController')
const workshop = require('../controllers/workOrdersController')


const isAuth = require('../middlewares/auth')
const api = express.Router()


api.get('/', (req, res)=>{
    res.status(200).send({message:`Hola ya está en marcha el servidor, perfectirijillo, amigucho ucho, lima limón `})
})
api.get('/users', users.getUsers )


// Log In
api.post('/signin', users.signIn)
api.post('/getuserbyemail', users.getUserByEmail)
api.post('/mail/getNewPass', mail.getNewPass )
// End login

//Account
api.post('/account/newAccount',isAuth, account.newAccount)
api.post('/account/countAccount',isAuth, account.countAccount)
api.post('/account/getAccount',isAuth, account.getAccount)
api.post('/account/getAccountById/:id',isAuth, account.getAccountById)
api.post('/account/editAccount',isAuth, account.editAccount)
api.post('/account/getAccountIdToCenter', isAuth, account.getAccountIdToCenter)
//End Account

//Plans
api.post('/plans/newPlan',isAuth, plans.newPlan)
api.post('/plans/getPlans',isAuth, plans.getPlans)
api.post('/plans/deletPlans',isAuth, plans.deletPlans)
api.post('/plans/getPlanById/:id',isAuth, plans.getPlanById)


//Center
api.post('/center/centerCount',isAuth, center.centerCount)
api.post('/center/newCenter',isAuth, center.newCenter)
api.post('/center/getCenterById',isAuth, center.getCenterById)
api.post('/center/getCountCenterById', isAuth, center.getCountCenterById)
api.post('/center/editCenter',isAuth, center.editCenter)
api.post('/center/getCenters',isAuth, center.getCenters)
api.post('/center/findCenterById/:id',isAuth, center.findCenterById)
api.post('/center/getDataCenterToId', isAuth, center.getDataCenterToId)

//Center: role center
api.post('/center/findCentersById', isAuth, center.findCentersById)

//Center: ListServices
api.post('/list/getOneListService',isAuth, list.getOneListService )
api.post('/list/newListService',isAuth, list.newListService)
api.post('/list/UpdateListService', isAuth, list.UpdateListService)
api.post('/list/getServicesById', isAuth, service.getServicesById)
api.post('/list/getServicesByIdNotType', isAuth, service.getServicesByIdNotType)
// api.get('/users/allusers', users.getUsers)

//Users
api.post('/users/signUp', users.signUp)
api.post('/users/getUsers', users.getUsers)
api.post('/users/getUserById/:id', users.getUserById)
api.post('/users/upDateUser/:id', users.upDateUser)


//Supply
api.post('/supplys/newSupply', supplys.newSupply)
api.post('/supplys/getSupply', supplys.getSupply)
api.post('/supplys/updateSupply', supplys.updateSupply)

//Types
api.post('/types/newType', types.newType)
api.post('/types/getTypes', types.getTypes)
api.post('/types/getTypesToAccount', types.getTypesToAccount)
api.post('/types/getTypesToCenter', types.getTypesToCenter)
api.post('/types/updateTypeById', types.updateTypeById)
api.post('/types/delet', types.delet)
api.post('/types/uploadIcon', types.uploadIcon)
api.post('/types/deletIcon', types.deletIcon)

//Services
api.post('/services/newService', service.newService)
api.post('/services/getServicesByAccount', service.getServicesByAccount)
api.post('/services/upDateService', isAuth, service.upDateService)
api.post('/services/getServicesCount', isAuth, service.getServicesCount)
api.post('/services/typesFromServices',isAuth, service.typesFromServices)

api.post('/services/uploadIcon', service.uploadIcon)

//Member Teams
api.post('/team/newMemberTeam', team.newMemberTeam )
api.post('/team/getMemberTeamByCenter', team.getMemberTeamByCenter)
api.post('/team/saveMemberTeam', team.saveMemberTeam)
api.post('/team/getMemberTeamToCenter', team.getMemberTeamToCenter)
api.post('/team/uploadImgProfile', team.uploadImgProfile)
api.post('/team/deletFiles', team.deletFiles)

//Surveys
api.get('/dcsi/newDCSI',isAuth, survey.newDCSI)
api.get('/dcsi/getDCSI', survey.getDCSI)

//Register Services
api.post('/reg/newService', regService.newService)
api.post('/reg/getRegServiceById', regService.getRegServiceById)
api.post('/reg/getHistoryToCenter', regService.getHistoryToCenter)
api.post('/reg/countHistoryToCenter', regService.countHistoryToCenter)
api.post('/reg/getTypesFromRegServices', regService.getTypesFromRegServices)
api.post('/reg/updateService', isAuth, regService.updateService)

//Customer
api.post('/customer/newCustomer', customer.newCustomer)
api.post('/customer/getCustomerByPlate', customer.getCustomerByPlate)
api.post('/customer/getCustomerByNit', customer.getCustomerByNit)
api.post('/customer/getCustomerByFilter', customer.getCustomerByFilter)
api.post('/customer/getCountCustomerByFilter', customer.getCountCustomerByFilter)

//vehicles
api.post('/vehicles/getVehicleByPlate', vehicles.getVehicleByPlate )

//Chart
api.post('/chart/serviceByCenter', chart.serviceByCenter)



// Apartado WorkShop
api.post('/workshop/newOrder', workshop.newOrder)
api.post('/workshop/getOrders', workshop.getOrders)
api.post('/workshop/countOrders', workshop.countOrders)
api.post('/workshop/getOrderById', workshop.getOrderById)
api.post('/workshop/updateOrder', workshop.updateOrder)
api.post('/workshop/uploadImgProfile', workshop.uploadImgProfile)
api.post('/workshop/sendEmail', workshop.sendEmail)



module.exports = api
