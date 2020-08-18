const express = require('express')
const app = express()
require('dotenv').config({ path: './variables_entorno/archivo.env' })
const port = process.env.PORT || 3000
const morgan = require('morgan')
const controlUsuario = require('./rutas/usuarioRutas')
const controlProductos = require('./rutas/productosRutas')
const cors = require('cors')
const corsOptions = {
    origin: 'http://127.0.0.1:5500',
    methods: "GET, POST, PUT, DELETE, OPTIONS",
    optionsSuccessStatus: 200
}

//MIDDLEWARE- LIBRERIÁS
app.use(cors(corsOptions))
app.use(express.static('controller'))
app.use(express.json({
    type: ['application/json']
}))
app.use(morgan('dev'))

//MIDDLEWARE-RUTAS
app.use('/delilah-resto/usuario/', controlUsuario)
app.use('/delilah-resto/productos/', controlProductos)

//INI-SERVIDOR
app.listen(port, () => {
    console.log(`Iniciado http://localhost:${port}`)
})

//EXPORT-SERVIDOS
module.exports = { app } //REQUERIR EN RUTAS!!!!