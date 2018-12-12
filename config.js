module.exports = {
    port: process.env.PORT || 3001,
    db: process.env.MONGODB || 'mongodb://localhost/erplavaderos', 
    SECRET_TOKEN: 'mysecret'
}