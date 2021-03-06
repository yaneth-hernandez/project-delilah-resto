# Project-Delilah-Resto
Se desarrolló según la siguiente estructura:
- FRONTEND (No obligatorio para aprobar)
    - Fué desarrollado con vista mobile para el usuario cliente y con vista escritorio para el usuario administrador muy similar a las vistas indicadas según diseño planteado. La prueba de API por este medio se realiza ingresando a la página del restaurant comenzando por el archivo `inicio.html`, el directorio `frontend` contiene todo el desarrollo de este entorno. 
    - `javascript(directorio)`, archivo `valores-globales.js` se guardó variable con la URI del proyecto en la constante "backendEndpoints", con la finalidad de disponibilizar el endpoint del Backend en entorno local y en el entorno producción
    - `assets`(directorio), se encuentran imágenes del platos que sirven para crear el producto, siempre que se acceda a la aplicación con usuario administrador, ver `Delilah-Resto Proyecto III.postman_collection.json`, endponit  


- BACKEND 
    Api- Delilah-Resto

## Backend. Api- Delilah-Resto
API que permite realizar CRUD de Usuarios, Productos y Pedidos de un e-commerce, para este caso un restaurant, Delilah-Resto. Como evaluación para cierre de carrera DWFS

### Estructura de la API
- Usuario CRUD 
    - /delilah-resto/usuarios/
- Productos CRUD
    - /delilah-resto/productos/
- Pedidos CRUD
    - /delilah-resto/pedidos/
- `variables_entorno` (directorio)
    - `archivo.env` : Donde fué definido el puerto de acceso, los datos requeridos para acceso a la base de datos y del JWT la secretkey y el tiempo de expiración del Token
- `main.js`: Archivo donde se encuentra la aplicación 
- `db`(directorio)
    - `db.sql`: Archivo que contiene el script que genera la base de datos.

        
### Recursos tecnológicos requeridos
- [NodeJS](https://nodejs.org/es/download/) -Desarrollo del backend
- [Npm](https://docs.npmjs.com/cli/v6/commands/npm-install) -Gestión de paquetes
    - [Express](http://expressjs.com/es/starter/installing.html) -Servidor web
    - [JWT](https://jwt.io/#libraries-io) - Json Web Token -Autenticación
    - [Swagger](https://www.npmjs.com/package/express-swagger-generator) - Documentación
- Postman -Prueba de métodos
- [Mysql](https://dev.mysql.com/downloads/) -Base de datos
- Git -Control de versiones

### Instalación
- Clonar el repositorio 
https://github.com/yaneth-hernandez/project-delilah-resto
- Instalar las dependencias utilizadas
    - Abrir la terminal
    - Ubicar la carpeta del proyecto
    - Ejecutar comando npm install.
- Inicializar servidor, ejecutando archivo `main.js` a través del comando node main.js
- Editar el `archivo.env` en USER y PASSWORD para acceso a la base de datos, definición de puerto de conexión.
- Importar la estructura de la Base de datos de `db.sql` Puede importar el archivo mediante un programa como MySQL Workbench o phpMyAdmin, si tiene una base de datos con nombre delilah_resto, será eliminada. 


### Prueba y Documentación
Prueba en swagger 
- http://localhost:3020/api-docs 
- Para los endpoints que requieren token, al ingresar al campo Authorize se debe escribir la para `Bearer`(portador del token) seguida de un espacio antes de colocar el valor del TOKEN. 

Documentación
- Ir a la pagina de [Swagger  Editor](https://editor.swagger.io/) e importar del proyecto el archivo `swagger.yaml`

- O bien:
 - Postman archivo `Delilah-Resto Proyecto III.postman_collection.json` con prueba de métodos

### Detalles de acceso y uso de endpoints

- Usuario CRUD 
    - Cliente/Administrador
        - Registro
        - Login/ Genera Token
    - Administrador
        - Listar/ Requiere Token
        - Actualizar/Modificar / Requiere Token
        - Borrar / Requiere Token

- Productos CRUD 
    - Administrador
        - Crear / Requiere Token
        - Actualizar/Modificar / Requiere Token
        - Borrar / Requiere Token
        - Listar (Listado de productos) 
    - Cliente/Administrador
        - Listar (Menú) 
        
- Pedidos CRUD 
    - Administrador
        - Listar y ver datalle(Listado de pedidos) 
        - Actualizar/Modificar estatus del pedido / Requiere Token
        - Borrar pedido / Requiere Token
    - Cliente
        - Crear / Requiere Token
        - Listar (Ver detalle del pedido)/ Requiere Token

