const express = require('express')
const { Registration, registrationSchema } = require('../models/registration')
const { validateBody } = require('../middlewares/payloadValidator')

const router = express.Router()

router.post('/', validateBody(registrationSchema), async (req, res) => {
    try {
        const { email } = req.body

        let registration = await Registration.findOne({ email })

        if (registration) {
            return res.send(`Email '${email}' is already used.`)
        }

        registration = new Registration(req.body)

        await registration.encryptPassword()
        await registration.save()

        return res.send('User successfully registered.')
    } catch (error) {
        //log here
    }
})

module.exports = router