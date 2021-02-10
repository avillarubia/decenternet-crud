const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = function authenticate(req, res, next) {
    const token = req.header('x-auth-token')
    if (!token) return res.status(400).send('FAILED: Access denied. No token provided')

    try {
        const decoded = jwt.verify(token, config.get('JWT_SECRET'))
        req.user = decoded
        next()
    } catch (error) {
        return res.status(400).send(error.message)
    }
}
