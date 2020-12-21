const jwt = require('jsonwebtoken')

function verificarToken(req, res, next) {
    const bearerHeader = req.headers['authorization']

    if (typeof bearerHeader !== 'undefined') {
        const bearerToken = bearerHeader.split(" ")[1]
        jwt.verify(bearerToken, 'secretkey001-1', (error, authData) => {
            if (!error && authData != null) {
                next()
            } else {
                console.log(error)
                res.status(403).json({
                    mensaje: 'Error en autenticación'
                })
            }
        })
    } else {
        res.sendStatus(403)
    }
}

module.exports = { verificarToken }