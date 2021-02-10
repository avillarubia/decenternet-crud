const express = require('express')
const jsonwebtoken = require('jsonwebtoken')
const { Book, bookSchema, bookSchemaWithId } = require('../models/book')
const { validateBody } = require('../middlewares/payloadValidator')
const authenticate = require('../middlewares/authenticator')

const router = express.Router()

router.get('/', authenticate, async (req, res) => {
    try {
        const decoded = jsonwebtoken.decode(req.header('x-auth-token'))

        const books = await Book.find({ author_id: decoded._id })

        books.reverse()

        res.send(books)
    } catch (error) {
        //log error
    }
})

router.post('/', [authenticate, validateBody(bookSchema)], async (req, res) => {
    try {
        const book = new Book(req.body)

        await book.save()

        res.send(book)
    } catch (error) {
        console.log()
        //log error
    }
})

router.patch('/', [authenticate, validateBody(bookSchemaWithId)], async (req, res) => {
    try {
        const decoded = jsonwebtoken.decode(req.header('x-auth-token'))
        const payload = req.body
        payload.author_id = decoded._id
        const { _id } = req.body
        const option = {
            new: true
        }

        const book = await Book.findByIdAndUpdate(_id, payload, option)

        if (!book) {
            return res.status(404).send(`Book with the given id '${_id}' does not exists.`)
        }

        res.send(book)
    } catch (error) {
        //log error
    }
})

router.delete('/:_id', authenticate, async (req, res) => {
    try {
        const { _id } = req.params

        const book = await Book.findByIdAndDelete(_id)

        res.send(book)
    } catch (error) {
        //log error
    }
})

module.exports = router