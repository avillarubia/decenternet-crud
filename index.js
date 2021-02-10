const express = require('express')

const app = express()

app.use(express.json())

require('./starters/joiExtender')()
require('./starters/db')()
require('./starters/server')(app)
require('./starters/cors')(app)
require('./starters/routes')(app)