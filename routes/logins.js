const express = require('express')
const { loginSchema, validateLogin, generateToken } = require('../models/login')
const { Registration } = require('../models/registration')
const { validateBody } = require('../middlewares/payloadValidator')

const router = express.Router()

router.post('/', validateBody(loginSchema), async (req, res) => {
    try {
        const { email, password } = req.body

        const user = await Registration.findOne({ email })

        if (!user) {
            return res.status(404).send(`User with the given email '${email}' does not exists.`)
        }

        const isPasswordMatched = await validateLogin(password, user.password)

        if (!isPasswordMatched) {
            return res.status(401).send(`Please provide the correct credentials.`)
        }

        const token = generateToken(user.toObject())

        res.send(token)
    } catch (error) {
        //log error
    }
})

module.exports = router