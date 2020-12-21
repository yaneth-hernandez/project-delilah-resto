const express = require('express')
const app = express()
require('dotenv').config({ path: './variables_entorno/archivo.env' })
const port = process.env.PORT || 3000
const morgan = require('morgan')
const verificarToken = require('./middleware/auth')
const mysqlConnection = require('./database')
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
app.post('/delilah-resto/productos/upload', verificarToken.verificarToken, upload.single('file'), (req, res) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    const body = req.body
    let sentenceSql = `INSERT INTO productos (nombre, descripcion, imagen, precio) VALUES (` +
        "'" + body.nombre + "'," +
        "'" + body.descripcion + "'," +
        "'" + nombreArchivo + "'," +
        body.precio + ")"
    mysqlConnection.query(sentenceSql, body, function(err, result) {
        if (err) {
            console.log(err)
            res.status(200).json({
                Mensaje: "Los datos introducidos son inválidos",
                Code: -100
            })
        } else {
            console.log(result.insertId)
            res.status(200).json({
                Mensaje: "Producto creado con exito",
                Code: 100,
                Item: result.insertId

            })
        }

    })

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