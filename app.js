const express = require('express')
const app = express()

app.use(express.static('./'))

app.get('/', function (req, res) {
  res.send('hello world')
})

app.listen(process.env.PORT || 5000, '0.0.0.0')