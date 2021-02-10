const mongoose = require('mongoose')
const config = require('config')

module.exports = function () {
    const db = config.get('MONGO_URI')

    mongoose
        .set('useNewUrlParser', true)
        .set('useUnifiedTopology', true)
        .set('useCreateIndex', true)
        .connect(db)
        .then(() =>
            console.log('Connected to MongoDB...')
        )
        .catch(err => console.error(`Could not connect to ${db}\n${err}`))
}
