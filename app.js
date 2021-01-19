require('dotenv').config()

const express = require('express')
const cors = require('cors')

const { dbConnect } = require('./db/config')

// * server
const app = express();

// * CORS
app.use(cors())

// * connection db
dbConnect()

// * Routes
app.get('/', (req, res) => {
    res.json('Hello world')
})

app.listen(process.env.PORT, () => {
    console.log('Server run at port ', process.env.PORT)
})