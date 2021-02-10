const Joi = require('joi')

const validateBody = (schema, selectively = false) => {
    return (req, res, next) => {
        const { body } = req

        if (!body)
            return res.status(400).send('No provided body.')

        let _schema = schema

        if (selectively)
            _schema = extractSchemaPieces(schema, body)

        const error = validate(_schema, body)

        if (error)
            return res.status(400).send(error)

        next()
    }
}

function extractSchemaPieces(schema, pieces) {
    const keys = Object.keys(pieces)
    const _schema = { ...schema }

    const schemaPieces = {}
    for (const key of keys) {
        if (_schema[key]) {
            schemaPieces[key] = _schema[key]
        }
    }

    return schemaPieces
}

function validate(schema, objectToValidate) {
    const { error } = Joi.object(schema).validate(objectToValidate)
    return error
}

module.exports = {
    validateBody
}