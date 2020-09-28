const express = require('express')
const controlProductos = express.Router()
const productosControlador = require('../controller/productosControlador')


controlProductos.get('/', productosControlador.verProductos)

controlProductos.get('/:id', productosControlador.productoId)

//controlProductos.post('/', productosControlador.crearProducto)

//controlProductos.post('/upload', productosControlador.enviarImagenes)

controlProductos.put('/:id', productosControlador.actualizarProducto)

controlProductos.delete('/:id', productosControlador.borraProducto)


module.exports = controlProductos