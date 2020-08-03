const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const morgan = require('morgan')
const usuarioController = require('./controller/usuarioController')


/**
 * @summary: Middleware
 * @instance: bodyParser
 * @description: respuesta a consulta de endpoints
 * @description: importar control de usuarios
 */
app.use(express.json())
app.use(morgan('dev'))
app.use('/delilah-resto/usuario/', usuarioController)


/**
 * @summary: inicialización de servidor
 */
app.listen(port, () => {
    console.log(`Iniciado http://localhost:${port}`)
})