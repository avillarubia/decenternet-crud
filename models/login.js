const Joi = require('joi')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('config')

const schema = {
    email: Joi.string().email().max(50).trim().required(),
    password: Joi.string().min(7).max(20).trim().required()
}

const validateLogin = async (plain, encypted) => {
    return await bcrypt.compare(plain, encypted);
}

const generateToken = (payload) => {
    return jwt.sign(payload, config.get('JWT_SECRET'))
}

module.exports = {
    loginSchema: schema,
    validateLogin,
    generateToken
}