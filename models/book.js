const Joi = require('joi')
const mongoose = require('mongoose')
const joigoose = require('joigoose')(mongoose)

const schema = {
    title: Joi.string().max(500).trim().required(),
    description: Joi.string().max(2000).trim().required(),
    author_id: Joi.objectId().required()
}
const schemaWithObjectId = {
    _id: Joi.objectId().required(),
    title: schema.title,
    description: schema.description,
    author_id: schema.author_id
}

const joiSchema = Joi.object(schema)
const option = {
    timestamps: true
}

const mongooseSchema = new mongoose.Schema(joigoose.convert(joiSchema), option)

const Book = mongoose.model('Book', mongooseSchema)

module.exports = {
    bookSchema: schema,
    bookSchemaWithId: schemaWithObjectId,
    Book
}