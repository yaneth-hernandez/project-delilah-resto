const express = require('express')
const controlUsuario = express.Router()


const mysqlConnection = require('../database')



controlUsuario.get('/', (req, res) => {
    res.json({
        mensaje: 'Respuesta enviada'
    })
})

controlUsuario.get('/:id', (req, res) => {
    const id = req.params.id
    res.json({
        mensaje: `id ${id} obtenido`
    })

    console.log(id)
})
controlUsuario.post('/', (req, res) => {
    const body = req.body
    console.log('Usuario registrado:' + body.usuario);
    res.json({
        Mensaje: "Usuario creado con exito",
        Code: 100,
        Login: body.usuario,
        Id: 10000
    })

})


controlUsuario.put('/:id', (req, res) => {
    const id = req.params.id
    const body = req.body
    res.json({
        respuesta: `datos modificados`
    })

    console.log(`Obteniedo id:${id} datos ${JSON.stringify(body)} actualizados`)
})
controlUsuario.delete('/:id', (req, res) => {
    const id = req.params.id
    const body = req.body
    res.json({
        respuesta: `datos de id borrados`
    })

    console.log(`Obteniedo id:${id} datos ${JSON.stringify(body)} borrados`)
})


module.exports = controlUsuario