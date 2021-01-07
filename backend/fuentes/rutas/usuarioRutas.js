const express = require('express')
const controlUsuario = express.Router()
const { verUsuarios, obtenerUsuario, crearUsuarios, crearUsuariosAdmin, loginUsuarios, actualizarUsuario, borraUsuario } = require('../controller/usuarioControlador')
const mdwVerificarToken = require('../middleware/auth')

/*******************************
 *      LISTAR USUARIOS         *
 *******************************/
controlUsuario.get('/', mdwVerificarToken.verificarToken, verUsuarios)


/*******************************
 * MANEJO USUARIO EN SESIÓN    *
 *******************************/
controlUsuario.get('/sesion/verify', obtenerUsuario)


/*******************************
 * CREAR USUARIOS CLIENTE      *
 *******************************/

/**
 * @typedef CrearClienteModelo
 * @property {string} usuario.required -Alias o email
 * @property {string} nombre.required -Nombre y apellido
 * @property {string} email.required -Email
 * @property {integer} telefono.required -Numero de telefono
 * @property {string} direccion.required -Ubicación o domicilio
 * @property {integer} password.required -Password
 */

/**
 * @typedef RespRegClienteOk
 * @property {string} Mensaje
 * @property {integer} Code
 */

/**
 * This function comment is parsed by doctrine
 * @route POST /delilah-resto/usuarios
 * @group Usuario 
 * @param {CrearClienteModelo.model} crearClienteModelo.body - Datos de registro
 * @returns {RespRegCliente.model} 200 - Informacion de usuario
 * @returns {Error}  400 - {Mensaje: "Error al ingresar los datos"}
 */
controlUsuario.post('/', crearUsuarios)


/*******************************
 *CREAR USUARIOS ADMINISTRADOR *
 *******************************/

/**
 * @typedef CrearUsuAdminModelo
 * @property {string} usuario.required -Alias o email
 * @property {string} nombre.required -Nombre y apellido
 * @property {string} email.required -Email
 * @property {integer} password.required -Password
 */

/**
 * @typedef RespRegAdminOk
 * @property {string} Mensaje
 * @property {integer} Code
 */

/**
 * This function comment is parsed by doctrine
 * @route POST /delilah-resto/usuarios/admin
 * @group Usuario
 * @param {CrearUsuAdminModelo.model} crearUsuAdminModelo.body - Datos de registro
 * @returns {RespRegAdminOk.model} 200 - Informacion de usuario
 * @returns {Error}  400 - {Mensaje: "Error al ingresar los datos"}
 */
controlUsuario.post('/admin', crearUsuariosAdmin)



/*******************************
 *           LOGIN              *
 ********************************/
/**
 * @typedef UsuarioModelo
 * @property {string} usuario.required -Alias o email
 * @property {integer} password.required -Password
 */

/**
 * @typedef RespuestaLoginOk
 * @property {string} Mensaje
 * @property {integer} Code
 * @property {string} rol
 * @property {integer} Login
 * @property {integer} Id
 * @property {string} Token.required
 */

/**
 * This function comment is parsed by doctrine
 * @route POST /delilah-resto/usuarios/login
 * @group Usuario
 * @param {UsuarioModelo.model} usuarioModelo.body - Email y password
 * @returns {RespuestaLoginOk.model} 200 - Informacion de usuario
 * @returns {Error}  400 - {Mensaje: "Problemas al autenticar usuario"}
 */
controlUsuario.post('/login', loginUsuarios)


/*******************************
 *    ACTUALIZAR USUARIOS      *
 *******************************/
controlUsuario.put('/:id', mdwVerificarToken.verificarToken, actualizarUsuario)


/*******************************
 *     BORRAR USUARIOS         *
 *******************************/
controlUsuario.delete('/:id', mdwVerificarToken.verificarToken, borraUsuario)




module.exports = controlUsuario