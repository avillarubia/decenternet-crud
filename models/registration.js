const Joi = require('joi')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const joigoose = require('joigoose')(mongoose)

const schema = {
    name: Joi.string().max(50).trim().required(),
    email: Joi.string().email().max(50).trim().required(),
    password: Joi.string().min(7).max(1020).trim().required()
}
const joiSchema = Joi.object(schema)
const option = {
    timestamps: true
}

const mongooseSchema = new mongoose.Schema(joigoose.convert(joiSchema), option)

mongooseSchema.methods.encryptPassword = async function () {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
}

const Registration = mongoose.model('Registration', mongooseSchema)

module.exports = {
    registrationSchema: schema,
    Registration
}