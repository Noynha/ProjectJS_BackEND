require('dotenv').config()
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const router = require('./src/routes')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(cors())
app.use(morgan('dev'))
app.use('/api', router)

const msg = `Backend server running on port ${port}` 
app.get('/', (_req, res) => {
  res.send(msg)
})

app.listen(port, () => console.info(msg))
