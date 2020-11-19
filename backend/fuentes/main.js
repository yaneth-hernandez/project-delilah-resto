const express = require('express')
const app = express()
require('dotenv').config({ path: './variables_entorno/archivo.env' })
const port = process.env.PORT || 3000
const morgan = require('morgan')
const controlUsuario = require('./rutas/usuarioRutas')
const controlProductos = require('./rutas/productosRutas')
const controlPedidos = require('./rutas/pedidosRutas')
const productosController = require('./controller/productosControlador')
const cors = require('cors')
const { v4: uuidv4 } = require('uuid');
//const { parse } = require('dotenv/types')
const corsOptions = {
        origin: 'http://127.0.0.1:5500',
        methods: "GET, POST, PUT, DELETE, OPTIONS",
        optionsSuccessStatus: 200
    }
    //gestion de imagenes
const multer = require('multer')

//MIDDLEWARE- gestion de imagenes POST
var nombreArchivo = ''
let storage = multer.diskStorage({
    destination: (res, file, cb) => {
        cb(null, 'public/imagenes')
    },
    filename: (req, file, cb) => {
        let extensionArchivo = ""
        if (file.mimetype == "image/jpeg") {
            extensionArchivo = ".jpeg"
        } else if (file.mimetype == "image/png") {
            extensionArchivo = ".png"
        }

        nombreArchivo = uuidv4() + extensionArchivo
        cb(null, nombreArchivo)
    }
})

const upload = multer({ storage })
app.post('/delilah-resto/productos/upload', upload.single('file'), (req, res) => {
    let statusCrecionProducto = productosController.crearProducto(req.body, nombreArchivo)
    return res.json(statusCrecionProducto)
})


//MIDDLEWARE- LIBRERIÁS
app.use(cors(corsOptions))
app.use(express.static(__dirname + '/'))
app.use(express.static('controller'))
app.use(express.json({
    type: ['application/json']
}))


app.use(morgan('dev'))

//imagen
app.use(express.urlencoded({ extended: true }))

//MIDDLEWARE-RUTAS
app.use('/delilah-resto/usuarios/', controlUsuario)
app.use('/delilah-resto/productos/', controlProductos)
app.use('/delilah-resto/pedidos/', controlPedidos)

//INI-SERVIDOR
app.listen(port, () => {
    console.log(`Iniciado http://localhost:${port}`)
})

//EXPORT-SERVIDOS
module.exports = { app } //REQUERIR EN RUTAS!!!!