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
                res.sendStatus(403)
            }

        })
    } else {
        res.sendStatus(403)
    }
}

module.exports = { verificarToken }