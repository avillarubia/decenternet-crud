const registrations = require('../routes/registrations')
const logins = require('../routes/logins')
const books = require('../routes/books')

module.exports = function (app) {
    app.use('/api/v1/registrations', registrations)
    app.use('/api/v1/logins', logins)
    app.use('/api/v1/books', books)
}