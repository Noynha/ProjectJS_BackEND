const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

const app = express()
const port = 5000

app.use(express.json())
app.use(cors())
app.use(morgan('dev'))

const msg = `Backend server running on port ${port}` 
app.get('/', (req, res) => {
  res.send(msg)
})

app.listen(port, () => {
  console.log(msg)
})