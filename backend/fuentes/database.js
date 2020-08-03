const mysql = require('mysql')

const mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'app.delilahresto',
    password: 'Numa2017',
    database: 'delilah_resto'
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