const express = require('express')
const controlProductos = express.Router()
const productosControlador = require('../controller/productosControlador')


controlProductos.get('/', productosControlador.verProductos)

controlProductos.get('/imagenes', productosControlador.imagenProductos)

controlProductos.get('/:id', productosControlador.productoId)

//controlProductos.post('/', productosControlador.crearProducto)

//controlProductos.post('/upload', productosControlador.enviarImagenes)

controlProductos.put('/', productosControlador.actualizarProducto)

controlProductos.delete('/borrar', productosControlador.borraProducto)


module.exports = controlProductos