const mysql = require('mysql')
require('dotenv').config({ path: './variables_entorno/archivo.env' })


const mysqlConnection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
})

mysqlConnection.connect(function(err) {
    if (err) {
        console.log(err)
        return
    } else {
        console.log('Base de datos conectada')
    }
})
module.exports = mysqlConnection