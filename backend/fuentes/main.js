const express = require('express')
const app = express()
require('dotenv').config({ path: './archivo.env' })
const port = process.env.PORT || 3000
const morgan = require('morgan')
const controlUsuario = require('./controller/usuarioController')
const cors = require('cors')
const corsOptions = {
    origin: 'http://127.0.0.1:5500',
    methods: "GET, POST, PUT, DELETE, OPTIONS",
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions))

app.use(express.static('controller'))
app.use(express.json({
    type: ['application/json']
}))
app.use(morgan('dev'))
app.use('/delilah-resto/usuario/', controlUsuario)

/**
 * @summary: inicialización de servidor
 */
app.listen(port, () => {
    console.log(`Iniciado http://localhost:${port}`)
})