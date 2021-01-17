const jwt = require('jsonwebtoken')

function verificarToken(req, res, next) {
    const bearerHeader = req.headers['authorization']

    if (typeof bearerHeader !== 'undefined') {
        const bearerToken = bearerHeader.split(" ")[1]
        jwt.verify(bearerToken, process.env.SECRETKEY, (error, authData) => {
            if (!error && authData != null) {
                next()
            } else if (error.name == 'TokenExpiredError') {
                res.status(200).json({
                    mensaje: 'Error en autenticación',
                    code: -100
                })
            } else {
                console.log('linea1' + authData)
                console.log('linea1' + error)
                res.sendStatus(403)
            }

        })
    } else {
        res.sendStatus(403)
    }
}

function verificarTokenUsuAdmin(req, res, next) {
    const bearerHeader = req.headers['authorization']

    if (typeof bearerHeader !== 'undefined') {
        const bearerToken = bearerHeader.split(" ")[1]
        jwt.verify(bearerToken, process.env.SECRETKEY, (error, authData) => {

            if (!error && authData != null && authData.id_rol === 'admin') {
                next()
            } else if (!error && authData != null && authData.id_rol === 'cliente') {
                res.status(401).json({
                    mensaje: 'Usted no está autorizado para realizar esta operación',
                    code: -100
                })
            } else if (error != null && error.name == 'TokenExpiredError') {
                res.status(200).json({
                    mensaje: 'Error en autenticación',
                    code: -100
                })
            } else {
                console.log('linea1' + authData)
                console.log('linea1' + error)
                res.sendStatus(403)
            }

        })
    } else {
        res.sendStatus(403)
    }
}



module.exports = { verificarToken, verificarTokenUsuAdmin }