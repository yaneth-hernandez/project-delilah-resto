const express = require('express')
const controlUsuario = express.Router()
const { verUsuarios, obtenerUsuario, crearUsuarios, crearUsuariosAdmin, loginUsuarios, actualizarUsuario, borraUsuario } = require('../controller/usuarioControlador')
const mdwVerificarToken = require('../middleware/auth')

/*******************************
 *      LISTAR USUARIOS         *
 *******************************/
/**
 * Obtener listado de ususarios
 * @route GET /delilah-resto/usuarios
 * @group Usuario
 * @returns {object} 200 - Información de todos los usuarios
 * @returns {Error}  500 -Error al listar usuarios
 * @security JWT
 */
controlUsuario.get('/', mdwVerificarToken.verificarToken, verUsuarios)


/*******************************
 * MANEJO USUARIO EN SESIÓN    *
 *******************************/
/**
 * @typedef RespuestaGetUsuarioOk
 * @property {string} Mensaje.required
 * @property {integer} Code.required
 * @property {integer} Id_Pedido.required
 */
/**
 * Obtiene el usuario autenticado en sesión
 * @route GET /delilah-resto/usuarios/sesion/verify
 * @group Usuario
 * @returns {object} 200 - Información de todos los usuarios
 * @returns {Error}  500 -Error al listar usuarios
 */
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
 * @property {string} Mensaje.required
 * @property {integer} Code.required
 */

/**
 * Crear usuario cliente
 * @route POST /delilah-resto/usuarios
 * @group Usuario 
 * @param {CrearClienteModelo.model} CrearClienteModelo.body - Datos de registro
 * @returns {RespRegClienteOk.model} 200 - Informacion de usuario
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
 * @property {string} Mensaje.required
 * @property {integer} Code.required
 */

/**
 * Crear un usuario administrador
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
 * @property {string} Mensaje.required
 * @property {integer} Code.required
 * @property {string} rol.required
 * @property {integer} Login.required
 * @property {integer} Id.required
 * @property {string} Token.required
 */

/**
 * Logueo para ingresar a Delilah
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
/**
 * @typedef ActualizarUsuarioModelo
 * @property {string} usuario_alias.required -Alias/email
 * @property {string} nombre_apellido.required -Nombre y apellido
 * @property {string} email.required -email
 * @property {integer} telefono.required -Número telefónico
 * @property {string} direccion.required -Domicilio o ubicación
 * @property {integer} passw.required -Clave secreta
 */

/**
 * @typedef RespuestaActualizarUsuarioOk
 * @property {string} Mensaje.required
 * @property {integer} Code.required
 */

/**
 * Actualizar datos del usuarios
 * @route PUT /delilah-resto/usuarios/{id}
 * @group Usuario 
 * @param {integer} id.path.required -Id del ususario a actualizar
 * @param {ActualizarUsuarioModelo.model} ActualizarUsuarioModelo.body - Datos del usuario
 * @returns {RespuestaActualizarUsuarioOk.model} 200 - Usuario actualizado de manera exitosa
 * @returns {Error}  500 - {Mensaje: "Error al actualizar el usuario"}
 * @security JWT
 */
controlUsuario.put('/:id', mdwVerificarToken.verificarToken, actualizarUsuario)


/*******************************
 *     BORRAR USUARIOS         *
 *******************************/
/**
 * @typedef RespuestaBorrarUsuarioOk
 * @property {string} Mensaje.required
 * @property {integer} Code.required
 */

/**
 * Borrar registro de usuario
 * @route DELETE /delilah-resto/usuarios/{id}
 * @group Usuario 
 * @param {integer} id.path.required -Id del usuario a borrar
 * @returns {RespuestaBorrarUsuarioOk.model} 200 - Usuario borrado con éxito
 * @returns {Error}  500 - {Mensaje: "Error al borrar el Usuario"}
 * @security JWT
 */
controlUsuario.delete('/:id', mdwVerificarToken.verificarToken, borraUsuario)

module.exports = controlUsuario